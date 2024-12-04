import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,  // Added the title
} from "@/components/ui/alert-dialog";
import Image from 'next/image';

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white">
        <div className="bg-white flex flex-col items-center my-10 justify-center">
          {/* Loading GIF */}
          <Image src="/progress.gif" width={100} height={100} alt="Loading" />
          
          {/* Accessibility Title */}
          <AlertDialogTitle className="sr-only">Loading in progress</AlertDialogTitle> {/* Visually hidden title */}

          {/* Visible Title */}
          <h2 className="mt-4 text-lg font-semibold">
            Generating your video... Do Not Refresh
          </h2>
          
          {/* Accessibility Description */}
          <AlertDialogDescription>
            The video generation process is in progress. Please wait until it is completed without refreshing the page.
          </AlertDialogDescription>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
