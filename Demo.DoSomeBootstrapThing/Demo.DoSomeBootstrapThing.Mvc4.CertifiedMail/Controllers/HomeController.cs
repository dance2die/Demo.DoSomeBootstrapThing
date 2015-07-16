using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Demo.DoSomeBootstrapThing.Mvc4.CertifiedMail.Models;

namespace Demo.DoSomeBootstrapThing.Mvc4.CertifiedMail.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View(new HomeModel());
		}

		[HttpPost]
		public ActionResult SearchByClient(HomeModel model)
		{
			return View("Index", model);
		}

		[HttpPost]
		public ActionResult Upload(HttpPostedFileBase file)
		{
			if (file != null && file.ContentLength > 0)
			{
				var fileName = Path.GetFileName(file.FileName);
				var path = Path.Combine(Server.MapPath("~/App_Data/uploads"), fileName);
				file.SaveAs(path);
			}

			//return View("Index", new HomeModel());
			return RedirectToAction("Index");
		}

		[HttpPost]
		public ActionResult GenerateBatchId(List<BeverageModel> models)
		{
			// Generate Batch ID.
			// Pass Batch ID to the URL.

			//var url = "http://www.gmail.com";
			//return Redirect(url);
			return RedirectToAction("Index", models);
		}
	}
}
