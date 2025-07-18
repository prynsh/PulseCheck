'use client'


import { MorphingDialog, MorphingDialogTrigger, MorphingDialogContainer, MorphingDialogContent, MorphingDialogClose } from '@/components/motion-primitives/morphing-dialog'

import { XIcon } from 'lucide-react'

export function DemoDialog({ videoSrc }: { videoSrc: string }) {
    return (
        <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
      <div className="rounded-full p-2 px-4 bg-black text-white border border-white shadow-md shadow-orange-400 hover:bg-black">
             View Demo
          </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl  p-1  dark:bg-zinc-950 dark:ring-zinc-800/50">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            className="aspect-video h-[25vh] w-full rounded-xl md:h-[70vh]"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
    )
  }
  