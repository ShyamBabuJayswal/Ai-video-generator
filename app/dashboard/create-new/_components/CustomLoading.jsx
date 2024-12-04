import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import Image from 'next/image';

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white">
        <div className="bg-white flex flex-col items-center my-10 justify-center">
          <Image src="/progress.gif" width={100} height={100} alt="Loading" />
          <h2 className="mt-4 text-lg font-semibold">Generating your video... Do Not Refresh</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
