import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from "@angular/router";
import {ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	title = 'university';
	public students: any = [
        {
        	id:0,
            image: '././assets/images/Student1.jpg',
            name: 'Heba Hegazy',
            Age: 24,
            facultyName: 'Engineering',
            phone: '01148880499',
            dateOfBirth: '02/07/1994',
            Address: 'Rehab city'

        },
        {
        	id:1,
            image: '././assets/images/student2.jpg',
            name: 'Ahmed Tarek',
            Age: 19,
            facultyName: 'Bussiness informatics',
            phone: '01164448977',
            dateOfBirth: '19/05/2000',
            Address: 'Nasr city'
        },
        {
        	id:2,
            image: '././assets/images/student3.jpg',
           	name: 'Aya Medhat',
            Age: 22,
            facultyName: 'Pharmacy',
            phone: '01149499219',
            dateOfBirth: '05/08/1996',
            Address: 'Maadi'
        },
        {
        	id:3,
        	image: '././assets/images/student4.jpg',
            name: 'Adam Mohamed',
            Age: 20,
            facultyName: 'Applied arts',
            phone: '01156560489',
            dateOfBirth: '02/03/1999',
            Address: 'Tagamoa'
        }
    ];
    public studentName:any;
    public facultyName:any;
    public phone:any;
    public dateOfBirth:any;
    public address:any;
    public studentImage:any;
    public studentDetails:any;
    public showDetails:boolean=false;

  constructor(private router: Router,private toastaService:ToastaService, private toastaConfig: ToastaConfig) {  this.toastaConfig.theme = 'bootstrap'; }

  ngOnInit() {
  }

  showStudentDetails(student)
  {
  	this.showDetails =true;
  	this.studentDetails = student;
  	this.studentName = student.name;
  	this.studentImage = student.image;
  	this.facultyName = student.facultyName;
  	this.phone = student.phone;
  	this.dateOfBirth = student.dateOfBirth;
  	this.address = student.Address;

  	console.log(this.studentDetails);
  }

  close()
  {
  	this.showDetails = false;
  }
  edit()
  {
  	let navigationExtras: NavigationExtras = {
            queryParams: {
                "name": this.studentName,
                "phone": this.phone,
                "faculty": this.facultyName,
                "dateOfBirth":this.dateOfBirth,
                "address":this.address,
                "image":this.studentImage
            }
        };
        this.router.navigate(["editStudent"], navigationExtras);
  }
   removeStudent()
    {
    	/*console.log(this.studentDetails)*/
       		this.showDetails =false;
            this.students.splice(this.studentDetails.id,1);
            this.toastaService.success('Student details has been successfully deleted!');
            setTimeout(() => {
        this.router.navigate(['home']);
    }, 1000);
           /* console.log(this.students)*/
    }
}
