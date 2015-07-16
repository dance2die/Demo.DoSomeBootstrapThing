using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using System.Xml.Serialization;
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

			//var stringwriter = new StringWriter();
			//var serializer = new XmlSerializer(typeof(List<BeverageModel>));
			//serializer.Serialize(stringwriter, models);
			//var xmlString = stringwriter.ToString();

			// http://forums.asp.net/t/1961502.aspx?Convert+List+to+XML+string+C+
			XElement xml = null;
			if (models != null)
			{
				xml = new XElement("beverages",
					models.Select(model => new XElement("beverage",
						new XElement("name", model.Name),
						new XElement("type", model.Type),
						new XElement("calories", model.Calories),
						new XElement("totalfat", model.TotalFat),
						new XElement("protein", model.Protein),
						new XElement("uid", model.Uid)
						)));
			}

			// Generate Batch ID.
			// Pass Batch ID to the URL.
			//var url = "http://www.gmail.com";
			//return Redirect(url);
			return RedirectToAction("Index", models);
		}
	}
}
