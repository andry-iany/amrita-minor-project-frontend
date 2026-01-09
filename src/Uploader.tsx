import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { useState } from 'react';
import useUploadFile from './useUploadFile';
import type { TPrediction } from './type';

type TProps = {
    setPredictions: (predictions: TPrediction[]) => void
}

const Uploader = ({setPredictions}: TProps) => {
  const [files, setFiles] = useState<File[] | undefined>();
  const { uploadFile, loading, error } = useUploadFile();

  const handleDrop = async (files: File[]) => {
    setFiles(files);

    try {
      const res = await uploadFile(files[0]); 
      setPredictions(res)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dropzone
      maxSize={1024 * 1024 * 10}
      minSize={32}
      onDrop={handleDrop}
      onError={console.error}
      src={files}
      className='bg-gray-50'
    >
      <DropzoneEmptyState />
      <DropzoneContent />
      {loading && <p>Uploading...</p>}
      {error && <p>Error: {error}</p>}
    </Dropzone>
  );
};

export default Uploader;