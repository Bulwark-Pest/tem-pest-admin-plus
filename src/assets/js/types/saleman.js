export class Saleman {
  constructor() {
    this.name = localStorage.getItem('userName');
    this.email = localStorage.getItem('userEmail');
    this.code = localStorage.getItem('userCode');
    this.salesmanId = localStorage.getItem('userSalesmanId');
    this.mainUserId = localStorage.getItem('mainUserId');
    this.active = localStorage.getItem('userActive');
    this.department = localStorage.getItem('userDepartment');
    this.extension = localStorage.getItem('userExtension');
    this.role = localStorage.getItem('userRole');
    this.mainRole = localStorage.getItem('userMainRole');
    this.hrEmpId = localStorage.getItem('userHrEmpId');
    this.phoneNumber = localStorage.getItem('userPhoneNumber');
  }
}
