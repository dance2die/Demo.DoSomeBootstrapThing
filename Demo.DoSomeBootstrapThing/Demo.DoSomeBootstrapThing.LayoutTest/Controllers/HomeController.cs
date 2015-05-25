using System.Collections.Generic;
using System.Web.Mvc;
using Demo.DoSomeBootstrapThing.LayoutTest.Models;

namespace Demo.DoSomeBootstrapThing.LayoutTest.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}

		public ActionResult Mint()
		{
			MintModel model = new MintModel
			{
				CountryListItems = new SelectList(GetCountries(), "Id", "Name")
			};
			return View(model);
		}

		private IEnumerable<Country> GetCountries()
		{
			return new List<Country>
			{
				new Country {Id = 1, Name = "USA"},
				new Country {Id = 2, Name = "Korea"},
				new Country {Id = 3, Name = "Uganda"},
			};
		}
	}
}