using System;
using System.Collections.Generic;
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

		public ActionResult SearchByClient(HomeModel model)
		{
			return View("Index", model);
		}

		public ActionResult Upload(HttpPostedFileBase file)
		{
			return View("Index", new HomeModel());
		}
	}
}
