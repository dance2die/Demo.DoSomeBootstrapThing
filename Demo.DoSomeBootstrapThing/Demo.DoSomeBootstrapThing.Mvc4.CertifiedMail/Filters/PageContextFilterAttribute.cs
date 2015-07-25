using System;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Demo.DoSomeBootstrapThing.Mvc4.CertifiedMail.Filters
{
	public class PageContextFilterAttribute : ActionFilterAttribute
	{
		public override void OnResultExecuting(ResultExecutingContext filterContext)
		{
			var viewBag = filterContext.Controller.ViewBag;
			viewBag.PageContext = GetPageContextJson(filterContext.HttpContext.ApplicationInstance.Context);
		}

		private dynamic GetPageContextJson(HttpContext httpContext)
		{
			return JsonConvert.SerializeObject(GetPageContext(httpContext), GetJsonSerializerSettings());
		}

		private static JsonSerializerSettings GetJsonSerializerSettings()
		{
			return new JsonSerializerSettings
			{
				ContractResolver = new CamelCasePropertyNamesContractResolver()
			};
		}

		private dynamic GetPageContext(HttpContext httpContext)
		{
			return new
			{
				db = "prod",
				userName = "skim",
				machineName = Environment.MachineName
			};
		}
	}
}