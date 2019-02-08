import { Component, OnInit } from '@angular/core';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import {ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
	
	public dateOfBirth:any;
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy/mm/dd',
    };
    public studentName:any;
    public studentMobile:any;
    public facultyName:any;
    public date:any;
    public studentAddress:any;
    public image:any;

    constructor(private router:Router, private route: ActivatedRoute,private toastaService:ToastaService, private toastaConfig: ToastaConfig) {

    	this.route.queryParams.subscribe(params => {
            this.studentName = params["name"];
            this.studentMobile = params["phone"];
            this.facultyName = params["faculty"];
		  	this.date = params["dateOfBirth"];
		  	this.studentAddress = params["address"];
		  	this.image = params["image"];

        });

        this.toastaConfig.theme = 'bootstrap';

        console.log(this.studentMobile)
     }

    ngOnInit() {
    }

    studentData(values)
    {
    	this.toastaService.success('Student details has been successfully edited!');
  		setTimeout(() => {
        this.router.navigate(['home']);
    }, 1000);
    }

  	onDateChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        this.dateOfBirth = event.formatted;
    }

  /*------------------------------------File Selection---------------------------------------------*/
  	public selectedFile: File;
	public fileExtensionError: boolean = false;
	public fileExtensionMessage: any;
	photoName: any;
	photoContent : any;
	fileExtension: any;

	onFileChanged(event) {
	    this.selectedFile = event.target.files[0]
	     this.photoName = this.selectedFile.name;

	    console.log(this.selectedFile);


	    var allowedExtensions = 
        ["jpg","jpeg","png","JPG","JPEG","JFIF","BMP","SVG"];
    	this.fileExtension = this.photoName.split('.').pop();

	    if(this.isInArray(allowedExtensions, this.fileExtension)) {
	        this.fileExtensionError = false;
	        this.fileExtensionMessage = ""
	    } else {
	        this.fileExtensionMessage = "Only photos allowed!!"
	        this.fileExtensionError = true;
	    }

	    if (this.selectedFile) {
	        var reader = new FileReader();
	        reader.onloadend = (e: any) => {
	            var contents = e.target.result;
	            this.photoContent = contents;
	        }
	        reader.readAsDataURL(this.selectedFile);
	    } 
    	else {
        alert("Failed to load file");
    	}
	}

	isInArray(array, word) 
	{
    	return array.indexOf(word.toLowerCase()) > -1;
	}
}