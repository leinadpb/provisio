import { OnInit, Injectable, Input, EventEmitter } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { File } from "@ionic-native/file";

// FIREBASE
import * as firebase from "firebase";

@Injectable()
export class UploadFileService implements OnInit {
  result;

  @Input() progress: any;
  public fileStream: EventEmitter<any> = new EventEmitter<any>();
  public progressStream: EventEmitter<any> = new EventEmitter<any>();

  private blobImage: any;

  constructor(private camera: Camera, private file: File) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // firebase.initializeApp({});
  }

  async pickImage() {
    const options: CameraOptions = {
      quality: 68,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      let cameraInfo = await this.camera.getPicture(options);
      //alert('File choose');
      let blobInfo = await this.makeFileIntoBlob(cameraInfo);
      //alert('Blob created')
      let uploadInfo: any = await this.uploadToFirebase(blobInfo);
      //alert('File uploaded');

      this.fileStream.emit({
          uploadInfo: uploadInfo,
          success: true,
          blob: this.blobImage
      });

      // alert("File Upload Success " + uploadInfo.fileName);
    } catch (e) {
      console.log(e);
      // alert("File Upload Error " + e.message);
    }
  }

  // FILE STUFF
  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          console.log("path", path);
          console.log("fileName", name);

          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });
          console.log(imgBlob.type, imgBlob.size);
          this.blobImage = imgBlob;
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }

  /**
   *
   * @param _imageBlobInfo
   */
  uploadToFirebase(_imageBlobInfo) {
    console.log("uploadToFirebase");
    return new Promise((resolve, reject) => {
      let fileRef = firebase.storage().ref("images/" + _imageBlobInfo.fileName);

      let uploadTask = fileRef.put(_imageBlobInfo.imgBlob);

      uploadTask.on(
        "state_changed",
        (_snapshot: any) => {
            this.progress = (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100;
            this.progressStream.emit({ value: this.progress });
            console.log("snapshot progess " + this.progress);
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // completion...
          resolve(uploadTask.snapshot);
        }
      );
    });
  }
}