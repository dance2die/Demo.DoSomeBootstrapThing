using System.ComponentModel;

namespace Demo.DoSomeBootstrapThing.Mvc4.CertifiedMail.Models
{
	public class HomeModel
	{
		[DisplayName("File #")]
		public string FileNumber { get; set; }
		[DisplayName("First Name")]
		public string FirstName { get; set; }
		[DisplayName("Last Name")]
		public string LastName { get; set; }

		//public HttpPostedFileBase File { get; set; }
	}
}