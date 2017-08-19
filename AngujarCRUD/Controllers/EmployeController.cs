using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using AngujarCRUD.Models;

namespace AngujarCRUD.Controllers
{
    public class EmployeController : Controller
    {
        //
        // GET: /Employe/
        public ActionResult Index()
        {
            ApplicationDbContext db = new ApplicationDbContext();          
            var emp = db.Employees.ToList();
            return View(emp);
        }
        [HttpGet]
        public ActionResult Create()
        {
            var emp = new Employee();
            return View(emp);
        }
        [HttpPost]
        public void Create(Employee model)
        {
            var db = new ApplicationDbContext();
            if (model.Id==0)
            { 
                db.Employees.Add(model);
            }
            else
            {
                db.Employees.Attach(model);
                db.Entry(model).State = EntityState.Modified;   
            }
           
             db.SaveChanges();
             RedirectToAction("Index", "Employe");
        }
        public JsonResult Data(int?id)
        {
            ApplicationDbContext db = new ApplicationDbContext();
           var emp= db.Employees.ToList();
           return this.Json(emp, JsonRequestBehavior.AllowGet);
        }
	}
}