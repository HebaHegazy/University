import { Component, OnInit} from '@angular/core';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import {ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

	public dateOfBirth:any;
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy/mm/dd',
    };

    public students:any= [];

    constructor(private toastaService:ToastaService, private toastaConfig: ToastaConfig, private router:Router, private route: ActivatedRoute) { this.toastaConfig.theme = 'bootstrap'; }

  	ngOnInit() {}

  	studentData(values)
  	{
  		this.students.push({'name':values.name,'mobile':values.mobile,'faculty':values.faculty,'dateOfBirth':values.dateOfBirth,'address':values.address,'image':values.image})
  		console.log(this.students);
  		this.toastaService.success('Student added successfully!');
  		setTimeout(() => {
        this.router.navigate(['home']);
    }, 1000);
/*  		console.log(values);*/
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