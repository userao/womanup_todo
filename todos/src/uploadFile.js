import { ref, uploadBytes } from 'firebase/storage';
import storage from './firebase.js';

const uploadFile = (selectedFile) => {
  const filename = selectedFile.name;
  const storageRef = ref(storage, filename);
  uploadBytes(storageRef, selectedFile);
};

export default uploadFile;
