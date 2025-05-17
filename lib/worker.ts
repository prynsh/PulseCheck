import { Redis } from "@upstash/redis";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import { NotificationJob } from "@/constants/types";
dotenv.config();


sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
const redis = Redis.fromEnv();

async function processQueue() {
  while (true) {
    
    const job = await redis.rpop("queue:notifications");

    if (!job) {
      await new Promise(res => setTimeout(res, 1000));
      continue;
    }
    let data : NotificationJob
    
    if (typeof job === "string") {
        try {
          data = JSON.parse(job) as NotificationJob;
        } catch (err) {
          console.error("❌ Failed to parse JSON:", job);
          console.log(err)
          continue;
        }
      } else {
        data = job as NotificationJob; // Cast because your runtime says it's object already
      }
    const { projectName, status, url, email, discord, type } = data;

    if (email) {
      try {
        await sgMail.send({
          to: email,
          from: process.env.SENDGRID_FROM_EMAIL!,
          subject: type === "ping-error" ? `❌ Failed to ping ${projectName}` : `⚠️ ${projectName} is down`,
          html: `
            <p><strong>${projectName}</strong> returned <code>${status}</code>.</p>
            <p>Check your project: <a href="${url}">${url}</a></p>
          `,
        });

        console.log(`📧 Email sent to ${email}`);
      } catch (err) {
        console.error("Failed to send email:", err);
      }
    }

    if (discord) {
      try {
        const response = await fetch(discord, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              embeds: [
                {
                  title: `🔔 Alert: ${projectName}`,
                  description: `**Status:** ${status}\n**URL:** [${url}](${url})`,
                  color: 16711680,
                  timestamp: new Date().toISOString(),
                },
              ],
            }),
          });
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ Discord webhook failed: ${response.status} ${response.statusText}\n${errorText}`);
          } else {
            console.log(`✅ Discord webhook sent successfully for ${projectName}`);
          }
          
      } catch (err) {
        console.error("Failed to send Discord webhook:", err);
      }
    }
  }
}

processQueue();
