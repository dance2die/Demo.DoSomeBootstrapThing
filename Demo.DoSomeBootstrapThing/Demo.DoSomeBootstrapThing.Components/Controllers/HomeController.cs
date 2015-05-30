using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Demo.DoSomeBootstrapThing.Components.Models;

namespace Demo.DoSomeBootstrapThing.Components.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			HomeIndexContext context = new HomeIndexContext();
			return View(context);
		}

		public ActionResult Next()
		{
			return View();
		}

		public ActionResult Panel()
		{
			return View();
		}

		public ActionResult Well()
		{
			return View();
		}
	}
}