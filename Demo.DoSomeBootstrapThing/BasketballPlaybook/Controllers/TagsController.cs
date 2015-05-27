using BasketballPlaybook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BasketballPlaybook.Controllers
{
    public class TagsController : ApiController
    {
        private readonly ITagRepository tagRepository;


        public TagsController(ITagRepository tagRepository) 
		{
			this.tagRepository = tagRepository;
		}

        public List<Tag> GetAll()
        {
            var list = this.tagRepository.All.ToList();
            return list;
        }

        public Tag Get(int id)
        {
			var item = this.tagRepository.Find(id);
			if (item == null)
			{
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return item;
        }

        public HttpResponseMessage Post(Tag item)
        {
            this.tagRepository.InsertOrUpdate(item);
            this.tagRepository.Save();

            var response = this.Request.CreateResponse(HttpStatusCode.Created, item);
            response.Headers.Location = this.Url.ApiLink(item.Id);
            return response;
        }

        public Tag Put(int id, Tag item)
        {
			this.tagRepository.InsertOrUpdate(item);
            this.tagRepository.Save();
            return item;
        }

        public HttpResponseMessage Delete(int id)
        {
			this.tagRepository.Delete(id);
            this.tagRepository.Save();
            return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
