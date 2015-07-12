using System.Web;
using System.Web.Mvc;

namespace Demo.DoSomeBootstrapThing.Mvc4.CertifiedMail
{
	public class FilterConfig
	{
		public static void RegisterGlobalFilters(GlobalFilterCollection filters)
		{
			filters.Add(new HandleErrorAttribute());
		}
	}
}