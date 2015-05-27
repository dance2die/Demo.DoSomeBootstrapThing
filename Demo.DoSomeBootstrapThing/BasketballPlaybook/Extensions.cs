using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Routing;

namespace BasketballPlaybook
{
    public static class Extensions
    {
        public static Uri ApiLink(this UrlHelper urlHelper, int id)
        {
            return new Uri(urlHelper.Link("DefaultApi", new { id = id }));
        }
    }
}