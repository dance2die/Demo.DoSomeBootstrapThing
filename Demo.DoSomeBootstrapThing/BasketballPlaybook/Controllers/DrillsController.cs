using BasketballPlaybook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BasketballPlaybook.Controllers
{
    public class DrillsController : ApiController
    {
        private readonly IDrillRepository drillRepository;

        public DrillsController(IDrillRepository drillRepository) 
		{
			this.drillRepository = drillRepository;
		}

        public List<Drill> GetByTag(int tagId)
        {
            var list = this.drillRepository.All.Where(d => d.TagId == tagId).ToList();
            return list;
        }

        public Drill Get(int id)
        {
            var item = this.drillRepository.Find(id);
            if (item == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return item;
        }

        public HttpResponseMessage Post(Drill item)
        {
            this.drillRepository.InsertOrUpdate(item);
            this.drillRepository.Save();

            var response = this.Request.CreateResponse(HttpStatusCode.Created, item);
            response.Headers.Location = this.Url.ApiLink(item.Id);
            return response;
        }

        public Drill Put(int id, Drill item)
        {
            this.drillRepository.InsertOrUpdate(item);
            this.drillRepository.Save();
            return item;
        }

        public HttpResponseMessage Delete(int id)
        {
            this.drillRepository.Delete(id);
            this.drillRepository.Save();
            return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
