function consume_webservice(method,endpoint,jsondata,origin,selected=0){
	var url="http://127.0.0.1:3000/"+endpoint
	var response=""

	const xhttpr= new XMLHttpRequest()
	xhttpr.open(method,url,true);

	if(method=="GET"){
		xhttpr.send()
	}else{
		xhttpr.setRequestHeader("Content-Type","application/json");
		xhttpr.send(jsondata)
	}

	xhttpr.onreadystatechange=()=>{
		if(xhttpr.status===200 && xhttpr.readyState === XMLHttpRequest.DONE){
			var result=""

			try {
				result=JSON.parse(xhttpr.response)
			}
			catch (error) {
		        console.log(error)
		    }
			
			var tr="";

			if(origin=="login"){
				if(result=="-1"){
					document.getElementById("loginlog").innerHTML="Incorrect Login credentials"
					document.getElementById("loginlog").style.color="red"
				}else{
					document.location.href=(result[0].role)+"dashboard"+`?id=${result[0].employee_id}`,true
				}
			}else if(origin=="departmenttable"){
				result.forEach(function(data) {
					tr+=`
						<tr>
							<td>${data.department_id}</td>
							<td>${data.department_name}</td>
							<td>${data.employees_required}</td>
							<td>${data.current_employees}</td>
							<td><button class="badge badge-boxed  badge-outline-success" onclick="loaddepartmentmodal(${data.department_id})">Update</button></td>
                            <td><button class="badge badge-boxed  badge-outline-danger" onclick="deletedepartment(${data.department_id})">Delete</button></td> 
						</tr>
					`
					
				})

				document.getElementById("departmenttable").innerHTML=tr
			}else if(origin=="jobpositiontable"){
				result.forEach(function(data) {
					tr+=`
						<tr>
							<td>${data.job_id}</td>
							<td>${data.job_name}</td>
							<td>${data.job_description}</td>
                            <td>${data.department_id}</td>
                            <td>${data.salary}</td>
							<td>${data.qualification_details}</td>
                            <td><button class="badge badge-boxed  badge-outline-success" onclick="loadmodaljobposition(${data.job_id})">Update</button></td>
                            <td><button class="badge badge-boxed  badge-outline-danger" onclick="deletejobposition(${data.job_id})">Delete</button></td> 
						</tr>
					`
					
				})

				document.getElementById("jobpositiontable").innerHTML=tr
				      
			}else if(origin=="jobopeningtable"){
				document.getElementById("jobopeningtable").innerHTML=""

				var td=""
				result.forEach(function(data) {
					var endpoint=`jobposition?id=${data.job_id}`
					td=`
					<td>${data.applicants_required}</td>
                    <td>${data.application_deadline}</td>
                    <td><button class="badge badge-boxed  badge-outline-success" onclick="loadmodaljobopening(${data.id})">Update</button></td>
                    <td><button class="badge badge-boxed  badge-outline-danger" onclick="deletejobopening(${data.id})">Delete</button></td> 
					`
					consume_webservice('GET',endpoint,[],"jobopeningdetails",td)
				})      
			}else if(origin=="jobopeningdetails"){
				var tr="<tr>";
				result.forEach(function(data) {
					tr=`
						<td>${data.job_id}</td>
	                    <td>${data.job_name}</td>

					`
				})

				tr+=selected
				tr+="</tr>"

				document.getElementById("jobopeningtable").innerHTML+=tr
					
			}else if(origin=="payrolltable"){
				document.getElementById("payrolltable").innerHTML=""

				result.forEach(function(data) {
					var endpoint=`employee?id=${data.employee_id}`

					td=`
					<td>${data.basic_salary}</td>
                    <td>${data.project_bonus}</td>
                    <td>${data.attendance_bonus}</td>
                    <td>${data.tax_deductions}</td>
                    <td><button class="badge badge-boxed  badge-outline-success" onclick="loadmodalpayroll(${data.payroll_id})">Update</button></td>
                    <td><button class="badge badge-boxed  badge-outline-danger" onclick="deletepayroll(${data.payroll_id})">Delete</button></td> 
					`

					consume_webservice('GET',endpoint,[],"payrolldetails",td)
					
				})
				      
			}else if(origin=="payrolldetails"){
				var tr="<tr>";
				result.forEach(function(data) {
					var employee_name=data.first_name+" "+data.last_name
					tr=`
						<td>${data.employee_id}</td>
	                    <td>${employee_name}</td>
					`
				})

				tr+=selected
				tr+="</tr>"

				document.getElementById("payrolltable").innerHTML+=tr
					
			}
			else if(origin=="userstable"){
				document.getElementById("userstable").innerHTML=""

				result.forEach(function(data) {
					var endpoint=`employee?id=${data.employee_id}`

					td=`
					<td>${data.username}</td>
                    <td>${data.role}</td>
             
                    <td><button class="badge badge-boxed  badge-outline-success" onclick="loadmodaluser(${data.user_id})">Update</button></td>
                    <td><button class="badge badge-boxed  badge-outline-danger" onclick="deleteuser(${data.user_id})">Delete</button></td> 
					`

					consume_webservice('GET',endpoint,[],"userdetails",td)
					
				})
				      
			}else if(origin=="userdetails"){
				var tr="<tr>";
				result.forEach(function(data) {
					var employee_name=data.first_name+" "+data.last_name
					tr=`
	                    <td>${employee_name}</td>
					`
				})

				tr+=selected
				tr+="</tr>"

				document.getElementById("userstable").innerHTML+=tr
					
			}else if(origin=="usermodal"){

				document.getElementById("nameselect").innerHTML=""

				result.forEach(function(data) {
					document.getElementById("usernameselect").value=data.username
					document.getElementById("roleselect").value=data.role
					document.getElementById("password").value=data.password
					document.getElementById("confirm").value=data.password
				
					var endpoint=`employee?id=${data.employee_id}`
					consume_webservice('GET',endpoint,[],"usermodaldetails")

					document.getElementById('userbuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="updateuser(${data.user_id})">Update</button>`
				})


				      
			}else if(origin=="usermodaldetails"){
				var options="";
				result.forEach(function(data) {
					var employee_name=data.first_name+" "+data.last_name
					options=`
	                    <option value="${data.employee_id}">${employee_name}</option>
					`
				})

				document.getElementById("nameselect").innerHTML=options
				document.getElementById("nameselect").setAttribute('disabled',true)
			}


			else if(origin=="employeetable"){
				document.getElementById("employeetable").innerHTML=""

				var td=""

				console.log(result)

				result.forEach(function(data) {
					var endpoint=`jobposition?id=${data.job_id}`
					var dob=new Date(data.date_of_birth)

					var day=("0"+dob.getDate()).slice(-2)
					var month=("0"+(dob.getMonth()+1)).slice(-2)

        			dob=`${day}/${month}/${dob.getFullYear()}`

        			var joindate=new Date(data.date_of_joining)

					var jday=("0"+joindate.getDate()).slice(-2)
					var jmonth=("0"+(joindate.getMonth()+1)).slice(-2)

        			joindate=`${jday}/${jmonth}/${joindate.getFullYear()}`

        			var fullname=data.first_name+" "+data.last_name

					td=`
					<td>${data.employee_id}</td>
                    <td>${data.first_name}</td>
                    <td>${data.last_name}</td>
                    <td>${dob}</td>
                    <td>${data.email_address}</td>
                    <td>${data.phone_contact}</td>
                    <td>${data.city}</td>
                    <td>${data.state}</td>
                    <td>${data.address}</td>
                    <td>${joindate}</td>
                   
                    <td><button class="badge badge-boxed  badge-outline-success" onclick="loadempmodal(${data.employee_id})">Update</button></td>
                    <td><button class="badge badge-boxed  badge-outline-danger" onclick="deleteemployee(${data.employee_id})">Delete</button></td> 
                    <td><button class="badge badge-boxed  badge-outline-warning" onclick="loadleavemodal(${data.employee_id},'${fullname}')">Leaves</button></td>
                    <td><button class="badge badge-boxed  badge-outline-warning" onclick="loadattendancemodal(${data.employee_id})">Attendance</button></td> 
					`
					consume_webservice('GET',endpoint,[],"employeedetails",td)
				})      
			}else if(origin=="employeedetails"){
				var tr="<tr>";
				result.forEach(function(data) {
					tr=`
	                    <td>${data.job_name}</td>`
				})

				tr+=selected
				tr+="</tr>"

				document.getElementById("employeetable").innerHTML+=tr
					
			}else if(origin=="leavemodalrequests"){
				var trq="";
				var trh="";

				result.forEach(function(data) {
					var leave_start=new Date(data.leave_start)
					var lsday=("0"+leave_start.getDate()).slice(-2)
					var lsmonth=("0"+(leave_start.getMonth()+1)).slice(-2)

	        		leave_start=`${lsday}/${lsmonth}/${leave_start.getFullYear()}`

	        		var leave_end=new Date(data.leave_end)
					var leday=("0"+leave_end.getDate()).slice(-2)
					var lemonth=("0"+(leave_end.getMonth()+1)).slice(-2)

	        		leave_end=`${leday}/${lemonth}/${leave_end.getFullYear()}`

	        		var status=""

	        		if(data.status==0){
	        			status="Requested"
	        		}else if(data.status==1){
	        			status="Accepted"
	        		}else{
						status="Denied"
	        		}

					if(data.status==0){
						trq+=`
							<tr>
								<td>${data.leave_type}</td>
								<td>${leave_start}</td>
								<td>${data.leave_days}</td>
	                            <td>${leave_end}</td>
	                         
	                            <td><button class="badge badge-boxed  badge-outline-success" onclick="loadmodaljobposition(${data.leave_id})">Authorize</button></td>
	                            <td><button class="badge badge-boxed  badge-outline-danger" onclick="deletejobposition(${data.leave_id})">Deny</button></td> 
							</tr>
						`
					}else{
						trh+=`
							<tr>
								<td>${data.leave_type}</td>
								<td>${leave_start}</td>
								<td>${data.leave_days}</td>
	                            <td>${leave_end}</td>
	                            <td>${status}</td>
	     
							</tr>
						`
					}
					
				})

				document.getElementById("leavemodalrequests").innerHTML=trq
				document.getElementById("leavemodalhistory").innerHTML=trh 
			}else if(origin=="attendacetable"){
				var tr=""

				result.forEach(function(data) {
					var attendance_date=new Date(data.attendance_date)
					var day=("0"+attendance_date.getDate()).slice(-2)
					var month=("0"+(attendance_date.getMonth()+1)).slice(-2)

        			attendance_date=`${attendance_date.getFullYear()}-${month}-${day}`

					tr+=`
						<tr>
							<td>${attendance_date }</td>
							<td>${data.clock_in_time}</td>
							<td>${data.clock_out_time}</td>
							
						</tr>
					`
					
				})

				document.getElementById("attendacetable").innerHTML=tr
			}
			else if(origin=="trainingrow"){
				var col=""
				result.forEach(function(data) {
					col+=`

						<div class="col-lg-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="blog-card">
                                        <img src="../assets/images/hrmis.jpeg" alt="" class="img-fluid rounded">
                                       
                                        <h4 class="my-3 font-15">
                                            <a href="" class="">${data.certification_type}</a>
                                        </h4>
                                        <p class="text-muted">${data.description}</p>
                                        <hr class="hr-dashed">
                                        <div class="d-flex justify-content-between">
                                            <div class="meta-box">
                                                <div class="media">                              
                                                    <div class="media-body align-self-center text-truncate">
                                                        <h6 class="m-0 text-dark">Provider</h6>
                                                        <ul class="p-0 list-inline mb-0">
                                                            <li class="list-inline-item">${data.provider}</li>                 
                                                        </ul>
                                                    </div><!--end media-body-->
                                                </div>                                            
                                            </div><!--end meta-box-->
                                            <div class="align-self-center">
                                                <a href="${data.provider_link}" target="_new" class="btn btn-sm btn-soft-primary">Visit<i class="las la-external-link-alt font-15"></i></a>  
                                            </div>

                                        </div>      
                                        <div class="d-flex justify-content-between">
                                        	<div class="dropdown-divider" style="margin-top: 10px;"></div>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <div class="align-self-center">

                                                <button class="badge badge-boxed  badge-outline-success" onclick="loadmodaltraining(${data.id})">Update</button>
                                            </div>
                                            <div class="align-self-center">
                                               	<button class="badge badge-boxed  badge-outline-danger" onclick="deletetraining(${data.id})">Delete</button>
                                            </div>
                                        </div>     

                                    </div><!--end blog-card-->                                                                                   
                                </div><!--end card-body-->
                            </div><!--end card-->
                        </div>
					`
					
				})
				document.getElementById("trainingrow").innerHTML=col

			}else if(origin=="modaljobposition"){
				result.forEach(function(data) {
					document.getElementById('jpjobname').value=data.job_name
					document.getElementById('jpjobdescription').value=data.job_description

					var endpoint=`department`
					consume_webservice('GET',endpoint,[],"modaljobpositionselect",data.department_id)
					

					document.getElementById('jpsalary').value=data.salary
					document.getElementById('jpqualifications').value=data.qualification_details
					document.getElementById('jpbuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="updatejobposition(${data.job_id})">Update</button>`
				})
				var jpmodal = new bootstrap.Modal(document.getElementById('jpmodal'));
				jpmodal.show();
			}else if(origin=="empmodal"){
				result.forEach(function(data) {
					var dob=new Date(data.date_of_birth)
					var day=("0"+dob.getDate()).slice(-2)
					var month=("0"+(dob.getMonth()+1)).slice(-2)

        			dob=`${dob.getFullYear()}-${month}-${day}`

        			var joindate=new Date(data.date_of_joining)
					var jday=("0"+joindate.getDate()).slice(-2)
					var jmonth=("0"+(joindate.getMonth()+1)).slice(-2)

        			joindate=`${joindate.getFullYear()}-${jmonth}-${jday}`

                    document.getElementById('empfirstname').value=data.first_name
                    document.getElementById('emplastname').value=data.last_name
                    document.getElementById('empdob').value=dob
                    document.getElementById('empemailaddress').value=data.email_address
                    document.getElementById('empphonecontact').value=data.phone_contact
                    document.getElementById('empcity').value=data.city
                    document.getElementById('empstate').value=data.state
                    document.getElementById('empaddress').value=data.address
                    document.getElementById('empjoindate').value=joindate

					var endpoint=`jobposition`
					consume_webservice('GET',endpoint,[],"empselect",data.job_id)
				
					document.getElementById('empbuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="updateemployee(${data.employee_id})">Update</button>`
				})
				var empmodal = new bootstrap.Modal(document.getElementById('empmodal'));
				empmodal.show();
			}else if(origin=="payrollmodal"){
				result.forEach(function(data) {

                    var endpoint=`employee?id=${data.employee_id}`
					consume_webservice('GET',endpoint,[],"payrollselect",data.employee_id);

                    document.getElementById('payrollsalary').value=data.basic_salary
                    document.getElementById('payrollprojectbonus').value=data.project_bonus
                    document.getElementById('payrollattendancebonus').value=data.attendance_bonus
                    document.getElementById('payrolltaxdeduction').value=data.tax_deductions
                
					document.getElementById('payrollbuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="updatepayroll(${data.payroll_id})">Update</button>`
				})
				var payrollmodal = new bootstrap.Modal(document.getElementById('payrollmodal'));
				payrollmodal.show();
			}else if(origin=="departmentmodal"){
				result.forEach(function(data) {
					document.getElementById('modaldepartmentname').value=data.department_name
					document.getElementById('modaldepartmentemployeesrequired').value=data.employees_required
					document.getElementById('modaldepartmentcurrentemployees').value=data.current_employees
					document.getElementById('deptbuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="updatedepartment(${data.department_id})">Update</button>`
				})
				var departmentmodal = new bootstrap.Modal(document.getElementById('departmentmodal'));
				departmentmodal.show();
			}

			else if(origin=="trainingmodal"){
				console.log(result)
				result.forEach(function(data) {
					document.getElementById('trainingprogramname').value=data.certification_type
					document.getElementById('trainingprogramdescription').value=data.description

					var endpoint=`department`
					consume_webservice('GET',endpoint,[],"trainingprogramselect",data.department_id)
					

					document.getElementById('trainingprogramprovider').value=data.provider
					document.getElementById('trainingprogramproviderlink').value=data.provider_link
					document.getElementById('trainingprogrambuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="updatetraining(${data.id})">Update</button>`
				})
				var trainingmodal = new bootstrap.Modal(document.getElementById('trainingmodal'));
				trainingmodal.show();
			}else if(origin=="modaljobopening"){
				result.forEach(function(data) {

					var endpoint=`jobposition`
					consume_webservice('GET',endpoint,[],"joselect",data.job_id)
					

					document.getElementById('joapplicants').value=data.applicants_required
					var deadline=new Date(data.application_deadline)
					var day=("0"+deadline.getDate()).slice(-2)
					var month=("0"+(deadline.getMonth()+1)).slice(-2)

        			deadline=`${deadline.getFullYear()}-${month}-${day}`
        			console.log(deadline)
					document.getElementById('jodeadline').value=deadline
					document.getElementById('jobuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="updatejobopening(${data.id})">Update</button>`
				})
				var jomodal = new bootstrap.Modal(document.getElementById('jomodal'));
				jomodal.show();
			}
			else if(origin=="modaljobpositionselect" || origin=="trainingprogramselect" || origin=="joselect" || origin=="empselect" || origin=="nameselect" || origin=="usernameselect" || origin=="payrollselect"){
				if(origin=="trainingprogramselect"){
					var options="";
					result.forEach(function(data) {
						if(selected==data.department_id){
							options+=`<option value="${data.department_id}" selected="selected">${data.department_name}</option>`
						}else{
							options+=`<option value="${data.department_id}">${data.department_name}</option>`
						}
					})
					document.getElementById('trainingprogramselect').innerHTML=options	
				}else if(origin=="joselect"){
					var options="";
					result.forEach(function(data) {
						if(selected==data.job_id){
							options+=`<option value="${data.job_id}" selected="selected">${data.job_name}</option>`
						}else{
							options+=`<option value="${data.job_id}">${data.job_name}</option>`
						}
					})
					document.getElementById('empselect').innerHTML=options	
				}else if(origin=="empselect"){
					var options="";
					result.forEach(function(data) {
						if(selected==data.job_id){
							options+=`<option value="${data.job_id}" selected="selected">${data.job_name}</option>`
						}else{
							options+=`<option value="${data.job_id}">${data.job_name}</option>`
						}
					})
					document.getElementById('empselect').innerHTML=options	
				}else if(origin=="nameselect"){
					var options=`<option value="" selected="selected">Select Employee</option>`;
					result.forEach(function(data) {
						var employeename=data.first_name+" "+data.last_name
						options+=`<option value="${data.employee_id}">${employeename}</option>`
					})
					document.getElementById('nameselect').innerHTML=options	
				}else if(origin=="payrollselect"){
					var options=""

					if(selected==0){
						options=`<option value="" selected="selected">Select Employee</option>`;
					}
					
					result.forEach(function(data) {
						var employeename=data.first_name+" "+data.last_name
						options+=`<option value="${data.employee_id}">${employeename}</option>`
					})

					document.getElementById('payrollselect').innerHTML=options	
				}else if(origin=="usernameselect"){
					var options="";
					result.forEach(function(data) {
						document.getElementById('usernameselect').value=data.email_address
					})
					
				}
				else{
					var options="";
					result.forEach(function(data) {
						if(selected==data.department_id){
							options+=`<option value="${data.department_id}" selected="selected">${data.department_name}</option>`
						}else{
							options+=`<option value="${data.department_id}">${data.department_name}</option>`
						}
					})
					document.getElementById('jpdepartment').innerHTML=options
				}
				
			}else if(origin=="payrollsalary"){
					result.forEach(function(data) {
						document.getElementById('payrollsalary').value=data.salary
						document.getElementById('payrollprojectbonus').value=0
						document.getElementById('payrollattendancebonus').value=0
						document.getElementById('payrolltaxdeduction').value=0
					})
			}else if(origin=="trainingselector"){
				var options="";
				options+=`<option value="">Select department to view</option>`

				result.forEach(function(data) {
					options+=`<option value="${data.department_id}">${data.department_name}</option>`
				})
				document.getElementById('trainingselector').innerHTML=options
			}
			else if(origin=="addjobposition"){
				document.getElementById('jpmodalclose').click()
				document.getElementById('jpt').click()
				document.getElementById('jplog').innerHTML="Job Position has been added"
				document.getElementById('jplog').style.color="green"

			}
			else if(origin=="updatejobposition"){
				document.getElementById('jpmodalclose').click()
				document.getElementById('jpt').click()
				document.getElementById('jplog').innerHTML="Job Position has been updated"
				document.getElementById('jplog').style.color="green"
			}
			else if(origin=="deletejobposition"){
				document.getElementById('jpmodalclose').click()
				document.getElementById('jpt').click()
				document.getElementById('jplog').innerHTML="Job Position has been deleted"
				document.getElementById('jplog').style.color="green"
			}else if(origin=="addtraining"){
				document.getElementById('trainingmodalclose').click()
				document.getElementById('tpt').click()
				document.getElementById('trainingrow').innerHTML=""
				document.getElementById('tptlog').innerHTML="Training program has been added"
				document.getElementById('tptlog').style.color="green"

			}
			else if(origin=="updatetraining"){
				document.getElementById('trainingmodalclose').click()
				document.getElementById('tpt').click()
				document.getElementById('trainingrow').innerHTML=""
				document.getElementById('tptlog').innerHTML="Training program has been updated"
				document.getElementById('tptlog').style.color="green"
			}
			else if(origin=="deletetraining"){
				document.getElementById('trainingmodalclose').click()
				document.getElementById('tpt').click()
				document.getElementById('trainingrow').innerHTML=""
				document.getElementById('tptlog').innerHTML="Training program has been deleted"
				document.getElementById('tptlog').style.color="green"
			}
			else if(origin=="addjobopening"){
				document.getElementById('jomodalclose').click()
				document.getElementById('jot').click()
				document.getElementById('jolog').innerHTML="Job opening has been added"
				document.getElementById('jolog').style.color="green"

			}
			else if(origin=="updatejobopening"){
				document.getElementById('jomodalclose').click()
				document.getElementById('jot').click()
				document.getElementById('jolog').innerHTML="Job Opening has been updated"
				document.getElementById('jolog').style.color="green"
			}
			else if(origin=="deletejobopening"){
				document.getElementById('jomodalclose').click()
				document.getElementById('jot').click()
				document.getElementById('jolog').innerHTML="Job Opening has been deleted"
				document.getElementById('jolog').style.color="green"
			}
			else if(origin=="addemployee"){
				document.getElementById('empmodalclose').click()
				document.getElementById('empst').click()
				document.getElementById('emplog').innerHTML="Employee has been added"
				document.getElementById('emplog').style.color="green"

			}
			else if(origin=="updateemployee"){
				document.getElementById('empmodalclose').click()
				document.getElementById('empst').click()
				document.getElementById('emplog').innerHTML="Employee details have been updated"
				document.getElementById('emplog').style.color="green"
			}
			else if(origin=="deleteemployee"){
				document.getElementById('empst').click()
				document.getElementById('emplog').innerHTML="Employee has been deleted"
				document.getElementById('emplog').style.color="green"
			}else if(origin=="adduser"){
				document.getElementById('usermodalclose').click()
				document.getElementById('empst').click()
				document.getElementById('emplog').innerHTML="User has been added"
				document.getElementById('emplog').style.color="green"

			}
			else if(origin=="updateuser"){
				document.getElementById('usermodalclose').click()
				prepareusermodal()
				document.getElementById('userlog').innerHTML="User details have been updated"
				document.getElementById('userlog').style.color="green"
			}
			else if(origin=="deleteuser"){
				document.getElementById('usermodalclose').click()
				prepareusermodal()
				document.getElementById('userlog').innerHTML="User has been deleted"
				document.getElementById('userlog').style.color="green"
			}
			else if(origin=="addpayroll"){
				document.getElementById('payrollmodalclose').click()
				document.getElementById('payt').click()
				document.getElementById('paylog').innerHTML="Payroll Entry has been added"
				document.getElementById('paylog').style.color="green"

			}
			else if(origin=="updatepayroll"){
				document.getElementById('payrollmodalclose').click()
				document.getElementById('payt').click()
				document.getElementById('paylog').innerHTML="Payroll details have been updated"
				document.getElementById('paylog').style.color="green"
			}
			else if(origin=="deletepayroll"){
				document.getElementById('payt').click()
				document.getElementById('paylog').innerHTML="Payroll Entry has been deleted"
				document.getElementById('paylog').style.color="green"
			}else if(origin=="adddepartment"){
				document.getElementById('departmentmodalclose').click()
				document.getElementById('dept').click()
				document.getElementById('deptlog').innerHTML="Department has been added"
				document.getElementById('deptlog').style.color="green"

			}
			else if(origin=="updatedepartment"){
				document.getElementById('departmentmodalclose').click()
				document.getElementById('dept').click()
				document.getElementById('deptlog').innerHTML="Department details have been updated"
				document.getElementById('deptlog').style.color="green"
			}
			else if(origin=="deletedepartment"){
				document.getElementById('dept').click()
				document.getElementById('deptlog').innerHTML="Department has been deleted"
				document.getElementById('deptlog').style.color="green"
			}


			else if(origin=="totaldepartments"){
				result.forEach(function(data) {
					document.getElementById('totaldepartments').innerHTML=data.total
				})
			}
			else if(origin=="totalemployees"){
				result.forEach(function(data) {
					document.getElementById('totalemployees').innerHTML=data.total
				})
			}
			else if(origin=="totaljobpositions"){
				result.forEach(function(data) {
					document.getElementById('totaljobpositions').innerHTML=data.total
				})

			}
			else if(origin=="totalprojects"){
				result.forEach(function(data) {
					document.getElementById('totalprojects').innerHTML=data.total
				})
			}
			else if(origin=="totaltrainings"){
				result.forEach(function(data) {
					document.getElementById('totaltrainings').innerHTML=data.total
				})
			}
			else if(origin=="totaljobopenings"){
				result.forEach(function(data) {
					document.getElementById('totaljobopenings').innerHTML=data.total
				})
				
			}
		}
	}

}


if(document.getElementById('login')){
	document.getElementById('login').addEventListener("click", function(){ 
	var username=document.getElementById('username').value
	var password=document.getElementById('password').value

	var jsondata={
		"username":username,
		"password": password
	}

    consume_webservice('POST',"login",JSON.stringify(jsondata),"login")
 }); 
}

if(document.getElementById('totaldepartments')){
	var endpoint="department?total=0"
	consume_webservice('GET',endpoint,[],"totaldepartments")
}

if(document.getElementById('totalemployees')){
	var endpoint="employee?total=0"
	consume_webservice('GET',endpoint,[],"totalemployees")
}

if(document.getElementById('totaljobpositions')){
	var endpoint="jobposition?total=0"
	consume_webservice('GET',endpoint,[],"totaljobpositions")
}

if(document.getElementById('totalprojects')){
	var endpoint="project?total=0"
	consume_webservice('GET',endpoint,[],"totalprojects")
}

if(document.getElementById('totaltrainings')){
	var endpoint="training?total=0"
	consume_webservice('GET',endpoint,[],"totaltrainings")
}

if(document.getElementById('totaljobopenings')){
	var endpoint="jobopening?total=0"
	consume_webservice('GET',endpoint,[],"totaljobopenings")
}


consume_webservice('GET','department',[],"departmenttable")

//1. Add the click event to consume
document.getElementById('dept').addEventListener("click", function(){ 
    consume_webservice('GET','department',[],"departmenttable")
 }); 

document.getElementById('jpt').addEventListener("click", function(){ 
    consume_webservice('GET','jobposition',[],"jobpositiontable")
 }); 

document.getElementById('tpt').addEventListener("click", function(){ 
    consume_webservice('GET','department',[],"trainingselector")
 }); 

document.getElementById('trainingselector').addEventListener("change", function(){ 
	var endpoint=`training?department_id=${this.value}`
    consume_webservice('GET',endpoint,[],"trainingrow")
 });


document.getElementById('payrollselect').addEventListener("change", function(){ 
	var endpoint=`jobposition?id=${this.value}`
	consume_webservice('GET',endpoint,[],"payrollsalary");
 });
				

document.getElementById('jot').addEventListener("click", function(){ 
    consume_webservice('GET','jobopening',[],"jobopeningtable")
 }); 

document.getElementById('empst').addEventListener("click", function(){ 
    consume_webservice('GET','employee',[],"employeetable")
 }); 

document.getElementById('payt').addEventListener("click", function(){ 
    consume_webservice('GET','payroll',[],"payrolltable")
 }); 


function loaddepartmentmodal(id){
	var endpoint=`department?id=${id}`
	consume_webservice('GET',endpoint,[],"departmentmodal")
}

function preparedepartmentmodal(){
	document.getElementById('modaldepartmentname').value=""
	document.getElementById('modaldepartmentemployeesrequired').value=""
	document.getElementById('modaldepartmentcurrentemployees').value=""
	document.getElementById('deptbuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="adddepartment()">Add</button>`
	var departmentmodal = new bootstrap.Modal(document.getElementById('departmentmodal'));
	departmentmodal.show();
}

function adddepartment(){
	var jsondata={
		"department_name":document.getElementById('modaldepartmentname').value,
		"employees_required":document.getElementById('modaldepartmentemployeesrequired').value,
		"current_employees":document.getElementById('modaldepartmentcurrentemployees').value
	}
	consume_webservice('POST',"department",JSON.stringify(jsondata),"adddepartment")
}

function updatedepartment(id){
	var endpoint=`department?id=${id}`

	var jsondata={
		"department_name":document.getElementById('modaldepartmentname').value,
		"employees_required":document.getElementById('modaldepartmentemployeesrequired').value,
		"current_employees":document.getElementById('modaldepartmentcurrentemployees').value
	}

	consume_webservice('PUT',endpoint,JSON.stringify(jsondata),"updatedepartment")
}

function deletedepartment(id){
	var endpoint=`department?id=${id}`
	consume_webservice('DELETE',endpoint,[],"deletedepartment")
}




function loadmodaljobposition(id){
	var endpoint=`jobposition?id=${id}`
	consume_webservice('GET',endpoint,[],"modaljobposition")
}

function preparejobposition(){
	document.getElementById('jpjobname').value=""
	document.getElementById('jpjobdescription').value=""
	var endpoint=`department`
	consume_webservice('GET',endpoint,[],"modaljobpositionselect",0)
	document.getElementById('jpsalary').value=""
	document.getElementById('jpqualifications').value=""
	document.getElementById('jpbuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="addjobposition()">Add</button>`
	var jpmodal = new bootstrap.Modal(document.getElementById('jpmodal'));
	jpmodal.show();
}

function addjobposition(){
	var jsondata={
		"job_name":document.getElementById('jpjobname').value,
		"job_description":document.getElementById('jpjobdescription').value,
		"department_id":document.getElementById('jpdepartment').value,
		"salary":document.getElementById('jpsalary').value,
		"qualification_details":document.getElementById('jpqualifications').value

	}
	consume_webservice('POST',"jobposition",JSON.stringify(jsondata),"addjobposition")
}

function updatejobposition(id){
	var endpoint=`jobposition?id=${id}`

	var jsondata={
		"job_name":document.getElementById('jpjobname').value,
		"job_description":document.getElementById('jpjobdescription').value,
		"department_id":document.getElementById('jpdepartment').value,
		"salary":document.getElementById('jpsalary').value,
		"qualification_details":document.getElementById('jpqualifications').value

	}
	consume_webservice('PUT',endpoint,JSON.stringify(jsondata),"updatejobposition")
}

function deletejobposition(id){
	var endpoint=`jobposition?id=${id}`
	consume_webservice('DELETE',endpoint,[],"deletejobposition")
}


//training

function loadmodaltraining(id){
	var endpoint=`training?id=${id}`
	consume_webservice('GET',endpoint,[],"trainingmodal")
}

function preparetraining(){
	document.getElementById('trainingprogramname').value=""
	document.getElementById('trainingprogramdescription').value=""
	
	var endpoint=`department`
	consume_webservice('GET',endpoint,[],"trainingprogramselect",0)

	document.getElementById('trainingprogramprovider').value=""
	document.getElementById('trainingprogramproviderlink').value=""

	document.getElementById('trainingprogrambuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="addtraining()">Add</button>`

	var trainingmodal = new bootstrap.Modal(document.getElementById('trainingmodal'));
	trainingmodal.show();
}

function addtraining(){
	var jsondata={
		"certification_type":document.getElementById('trainingprogramname').value,
		"description":document.getElementById('trainingprogramdescription').value,
		"department_id":document.getElementById('trainingprogramselect').value,
		"provider":document.getElementById('trainingprogramprovider').value,
		"provider_link":document.getElementById('trainingprogramproviderlink').value
	}
	consume_webservice('POST',"training",JSON.stringify(jsondata),"addtraining")
}

function updatetraining(id){
	var endpoint=`training?id=${id}`

	var jsondata={
		"certification_type":document.getElementById('trainingprogramname').value,
		"description":document.getElementById('trainingprogramdescription').value,
		"department_id":document.getElementById('trainingprogramselect').value,
		"provider":document.getElementById('trainingprogramprovider').value,
		"provider_link":document.getElementById('trainingprogramproviderlink').value

	}
	consume_webservice('PUT',endpoint,JSON.stringify(jsondata),"updatetraining")
}

function deletetraining(id){
	var endpoint=`training?id=${id}`
	consume_webservice('DELETE',endpoint,[],"deletetraining")
}

//job opening
function loadmodaljobopening(id){
	var endpoint=`jobopening?id=${id}`
	consume_webservice('GET',endpoint,[],"modaljobopening")
}

function preparejobopening(){
	document.getElementById('joapplicants').value=""
	document.getElementById('jodeadline').value=""

	var endpoint=`jobposition`
	consume_webservice('GET',endpoint,[],"joselect")

	document.getElementById('jobuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="addjobopening()">Add</button>`
	var jomodal = new bootstrap.Modal(document.getElementById('jomodal'));
	jomodal.show();
}

function addjobopening(){
	var jsondata={
		"job_id":document.getElementById('joselect').value,
		"applicants_required":document.getElementById('joapplicants').value,
		"application_deadline":document.getElementById('jodeadline').value

	}

	consume_webservice('POST',"jobopening",JSON.stringify(jsondata),"addjobopening")
}

function updatejobopening(id){
	var endpoint=`jobopening?id=${id}`

	var jsondata={
		"job_id":document.getElementById('joselect').value,
		"applicants_required":document.getElementById('joapplicants').value,
		"application_deadline":document.getElementById('jodeadline').value,

	}
	consume_webservice('PUT',endpoint,JSON.stringify(jsondata),"updatejobopening")
}

function deletejobopening(id){
	var endpoint=`jobopening?id=${id}`
	consume_webservice('DELETE',endpoint,[],"deletejobopening")
}


//employee
function loadempmodal(id){
	var endpoint=`employee?id=${id}`
	consume_webservice('GET',endpoint,[],"empmodal")
}

function prepareempmodal(){
	document.getElementById('empfirstname').value=""
    document.getElementById('emplastname').value=""
    document.getElementById('empdob').value=""
    document.getElementById('empemailaddress').value=""
    document.getElementById('empphonecontact').value=""
    document.getElementById('empcity').value=""
    document.getElementById('empstate').value=""
    document.getElementById('empaddress').value=""
    document.getElementById('empjoindate').value=""

	var endpoint=`jobposition`
	consume_webservice('GET',endpoint,[],"empselect",0);

	document.getElementById('empbuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="addemployee()">Add</button>`
	
	var empmodal = new bootstrap.Modal(document.getElementById('empmodal'));
	empmodal.show();
}

function loadmodaluser(id){
	var endpoint=`user?id=${id}`
	consume_webservice('GET',endpoint,[],"usermodal")
}

function prepareusermodal(){
	consume_webservice('GET','user',[],"userstable")

	document.getElementById('roleselect').value=""
	document.getElementById('password').value=""
	document.getElementById('usernameselect').value=""
    document.getElementById('confirm').value=""
    
	var endpoint=`employee`
	consume_webservice('GET',endpoint,[],"nameselect",0);

	document.getElementById('userbuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="adduser()">Add</button>`
	
	var usermodal = new bootstrap.Modal(document.getElementById('usermodal'));
	usermodal.show();
}

document.getElementById('nameselect').addEventListener("change", function(){ 
	var endpoint=`employee?id=${this.value}`
    consume_webservice('GET',endpoint,[],"usernameselect")
 });

function addemployee(){
	var jsondata={
		"job_id": document.getElementById('empselect').value,
		"first_name": document.getElementById('empfirstname').value,
	    "last_name":document.getElementById('emplastname').value,
	    "date_of_birth":document.getElementById('empdob').value,
	    "email_address":document.getElementById('empemailaddress').value,
	    "phone_contact":document.getElementById('empphonecontact').value,
	    "city":document.getElementById('empcity').value,
	    "state":document.getElementById('empstate').value,
	    "address":document.getElementById('empaddress').value,
	    "date_of_joining":document.getElementById('empjoindate').value,
	    
	}

	consume_webservice('POST',"employee",JSON.stringify(jsondata),"addemployee")
}

function adduser(){
	var jsondata=""

	if(document.getElementById('nameselect').value==""|| document.getElementById('usernameselect').value=="" || document.getElementById('roleselect').value=="" || document.getElementById('password').value==""){
		document.getElementById('userlog').innerHTML="All Starred fields are required"
		document.getElementById('userlog').style.color="red"

	}else if(document.getElementById('password').value==document.getElementById('confirm').value){
		document.getElementById('userlog').innerHTML=""

		var jsondata={
			"employee_id": document.getElementById('nameselect').value,
			"username": document.getElementById('usernameselect').value,
		    "password":document.getElementById('password').value,
		    "role":document.getElementById('roleselect').value
		}

		consume_webservice('POST',"user",JSON.stringify(jsondata),"adduser")

	}
	else{
		document.getElementById('userlog').innerHTML="Passwords dont match"
		document.getElementById('userlog').style.color="red"
	}

	
}

function updateuser(id){
	var endpoint=`user?id=${id}`

	var jsondata=""

	if(document.getElementById('nameselect').value==""|| document.getElementById('usernameselect').value=="" || document.getElementById('roleselect').value=="" || document.getElementById('password').value==""){
		document.getElementById('userlog').innerHTML="All Starred fields are required"
		document.getElementById('userlog').style.color="red"

	}else if(document.getElementById('password').value==document.getElementById('confirm').value){
		document.getElementById('userlog').innerHTML=""

		var jsondata={
			"employee_id": document.getElementById('nameselect').value,
			"username": document.getElementById('usernameselect').value,
		    "password":document.getElementById('password').value,
		    "role":document.getElementById('roleselect').value
		}

		consume_webservice('PUT',endpoint,JSON.stringify(jsondata),"updateuser")

	}
	else{
		document.getElementById('userlog').innerHTML="Passwords dont match"
		document.getElementById('userlog').style.color="red"
	}
}

function updateemployee(id){
	var endpoint=`employee?id=${id}`

	var jsondata={
		"first_name":document.getElementById('empfirstname').value,
		"job_id":document.getElementById('empselect').value,
        "last_name":document.getElementById('emplastname').value,
        "date_of_birth":document.getElementById('empdob').value,
        "email_address":document.getElementById('empemailaddress').value,
        "phone_contact":document.getElementById('empphonecontact').value,
        "city":document.getElementById('empcity').value,
        "state":document.getElementById('empstate').value,
        "address":document.getElementById('empaddress').value,
        "date_of_joining":document.getElementById('empjoindate').value,
        "password":document.getElementById('emppassword').value
	}
	consume_webservice('PUT',endpoint,JSON.stringify(jsondata),"updateemployee")
}


function deleteemployee(id){
	var endpoint=`employee?id=${id}`
	consume_webservice('DELETE',endpoint,[],"deleteemployee")
}


function deleteuser(id){
	var endpoint=`user?id=${id}`
	consume_webservice('DELETE',endpoint,[],"deleteuser")
}

//------ leaves
//employee
function loadleavemodal(id,name){
	document.getElementById('empnameleave').innerHTML=name
	var leavemodal = new bootstrap.Modal(document.getElementById('leavesmodal'));
	leavemodal.show();

	var endpoint=`leave?employee_id=${id}`
	consume_webservice('GET',endpoint,[],"leavemodalrequests",0);

}

function loadattendancemodal(id,name){
	document.getElementById('empnameatt').innerHTML=name
	var atttendancemodal = new bootstrap.Modal(document.getElementById('attendancemodal'));
	atttendancemodal.show();

	var endpoint=`attendance?employee_id=${id}`
	consume_webservice('GET',endpoint,[],"attendacetable",0);

}


function prepareempmodal(){
	document.getElementById('empfirstname').value=""
    document.getElementById('emplastname').value=""
    document.getElementById('empdob').value=""
    document.getElementById('empemailaddress').value=""
    document.getElementById('empphonecontact').value=""
    document.getElementById('empcity').value=""
    document.getElementById('empstate').value=""
    document.getElementById('empaddress').value=""
    document.getElementById('empjoindate').value=""
  
	var endpoint=`jobposition`
	consume_webservice('GET',endpoint,[],"empselect",0);

	document.getElementById('empbuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="addemployee()">Add</button>`
	
	var empmodal = new bootstrap.Modal(document.getElementById('empmodal'));
	empmodal.show();
}

function addemployee(){
	var jsondata={
		"job_id": document.getElementById('empselect').value,
		"first_name": document.getElementById('empfirstname').value,
	    "last_name":document.getElementById('emplastname').value,
	    "date_of_birth":document.getElementById('empdob').value,
	    "email_address":document.getElementById('empemailaddress').value,
	    "phone_contact":document.getElementById('empphonecontact').value,
	    "city":document.getElementById('empcity').value,
	    "state":document.getElementById('empstate').value,
	    "address":document.getElementById('empaddress').value,
	    "date_of_joining":document.getElementById('empjoindate').value,
	}
	consume_webservice('POST',"employee",JSON.stringify(jsondata),"addemployee")
}

function updateemployee(id){
	var endpoint=`employee?id=${id}`

	var jsondata={
		"first_name":document.getElementById('empfirstname').value,
		"job_id":document.getElementById('empselect').value,
        "last_name":document.getElementById('emplastname').value,
        "date_of_birth":document.getElementById('empdob').value,
        "email_address":document.getElementById('empemailaddress').value,
        "phone_contact":document.getElementById('empphonecontact').value,
        "city":document.getElementById('empcity').value,
        "state":document.getElementById('empstate').value,
        "address":document.getElementById('empaddress').value,
        "date_of_joining":document.getElementById('empjoindate').value,
        "password":document.getElementById('emppassword').value
	}
	consume_webservice('PUT',endpoint,JSON.stringify(jsondata),"updateemployee")
}


function deleteemployee(id){
	var endpoint=`employee?id=${id}`
	consume_webservice('DELETE',endpoint,[],"deleteemployee")
}


//payroll
function loadmodalpayroll(id){
	var endpoint=`payroll?payroll_id=${id}`
	consume_webservice('GET',endpoint,[],"payrollmodal")
}

function preparemodalpayroll(){
	var endpoint=`employee`
	consume_webservice('GET',endpoint,[],"payrollselect",0);

	document.getElementById('payrollbuttons').innerHTML=`<button type="submit" class="btn btn-de-primary" onclick="addpayroll()">Add</button>`
	
	var modalpayroll = new bootstrap.Modal(document.getElementById('payrollmodal'));
	modalpayroll.show();
}

function addpayroll(){
	var jsondata={
		"employee_id": document.getElementById('payrollselect').value,
		"basic_salary": document.getElementById('payrollsalary').value,
	    "project_bonus":document.getElementById('payrollprojectbonus').value,
	    "attendance_bonus":document.getElementById('payrollattendancebonus').value,
	    "tax_deductions":document.getElementById('payrolltaxdeduction').value
	}
	consume_webservice('POST',"payroll",JSON.stringify(jsondata),"addpayroll")
}

function updatepayroll(id){
	var endpoint=`payroll?id=${id}`

	var jsondata={
		"basic_salary":document.getElementById('payrollsalary').value,
		"project_bonus":document.getElementById('payrollprojectbonus').value,
        "attendance_bonus":document.getElementById('payrollattendancebonus').value,
        "tax_deductions":document.getElementById('payrolltaxdeduction').value
    }
        
	consume_webservice('PUT',endpoint,JSON.stringify(jsondata),"updatepayroll")
}


function deletepayroll(id){
	var endpoint=`payroll?id=${id}`
	consume_webservice('DELETE',endpoint,[],"deletepayroll")
}




