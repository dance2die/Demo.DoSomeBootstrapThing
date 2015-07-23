using System;
using System.Diagnostics;
using System.Web.Mvc;

namespace Demo.DoSomeBootstrapThing.Mvc4.CertifiedMail.Filters
{
	public class CertifiedMailHandleErrorAttribute : HandleErrorAttribute
	{
		private const string XMLHTTPREQUEST = "XMLHttpRequest";

		/// <summary>
		/// Handle Ajax and normal requests differently
		/// </summary>
		/// <remarks>
		/// http://www.codeproject.com/Articles/731913/Exception-Handling-in-MVC
		/// </remarks>
		public override void OnException(ExceptionContext exceptionContext)
		{
			if (exceptionContext.ExceptionHandled || !exceptionContext.HttpContext.IsCustomErrorEnabled) return;

			// For some reason, AngularJS doesn't pass x-request-with header... Can't get it working in index.js.
			// if the request is AJAX return JSON else view.
			if (exceptionContext.HttpContext.Request.IsAjaxRequest())
			{
				// Because its a exception raised after ajax invocation, lets return Json
				exceptionContext.Result = new JsonResult()
				{
					Data = exceptionContext.Exception.Message,
					JsonRequestBehavior = JsonRequestBehavior.AllowGet
				};

				exceptionContext.ExceptionHandled = true;
				exceptionContext.HttpContext.Response.Clear();
			}
			else
			{
				// Normal Exception so let's handle it in default ways.
				base.OnException(exceptionContext);
			}

			EmailException(exceptionContext);
		}


		/// <summary>
		/// Email exception to Developers.
		/// </summary>
		private void EmailException(ExceptionContext filterContext)
		{
			string message = filterContext.Exception.ToString();
			// http://stackoverflow.com/a/3135000/4035
			var errorClass = filterContext.RouteData.Values["controller"] as string;
			var errorFunction = filterContext.RouteData.Values["action"] as string;
			const bool isWeb = true;

			Debug.WriteLine(message);
			Console.WriteLine(message);
		}
	}
}