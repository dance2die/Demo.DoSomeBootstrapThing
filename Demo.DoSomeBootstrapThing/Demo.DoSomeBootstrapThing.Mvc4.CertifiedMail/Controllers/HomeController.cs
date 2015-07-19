using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using Demo.DoSomeBootstrapThing.Mvc4.CertifiedMail.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Demo.DoSomeBootstrapThing.Mvc4.CertifiedMail.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View(new HomeModel());
		}

		//[HttpPost]
		[ChildActionOnly]
		//public ActionResult SearchByClient(HomeModel model)
		public ActionResult SearchByClient(IHtmlString htmlString)
		{
			List<BeverageModel> models = new List<BeverageModel>
				{
				new BeverageModel {Calories = 100, Name = "Chocobar", TotalFat = "10g", Type = "Chocolate", Protein = "0g"},
				new BeverageModel {Calories = 200, Name = "Butter", TotalFat = "100g", Type = "Dairy", Protein = "10g"},
				new BeverageModel {Calories = 300, Name = "Cheese", TotalFat = "1000g", Type = "Dairy", Protein = "100g"},
				};
			var jsonData = JsonConvert.SerializeObject(models, GetJsonSerializerSettings());
			ViewBag.JsonData = new HtmlString(jsonData);

			//return View("Index", model);
			return PartialView(new HtmlString(jsonData));
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

		private static JsonSerializerSettings GetJsonSerializerSettings()
		{
			var jsonSerializerSettings = new JsonSerializerSettings();
			jsonSerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
			return jsonSerializerSettings;
		}
	}
}
