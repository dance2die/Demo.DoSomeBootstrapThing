using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace BasketballPlaybook.Models
{
    public class PlaybookDbInitializer : DropCreateDatabaseIfModelChanges<PlaybookDbContext>
    {
        protected override void Seed(PlaybookDbContext context)
        {
            var tag1 = new Tag { Name = "Ball Handling" };
            var tag2 = new Tag { Name = "Passing" };
            var tag3 = new Tag { Name = "Shooting" };
            var tag4 = new Tag { Name = "Rebounding" };
            var tag5 = new Tag { Name = "Transition" };
            var tag6 = new Tag { Name = "Defense" };
            var tag7 = new Tag { Name = "Team Offense" };
            var tag8 = new Tag { Name = "Team Defense" };

            context.Tags.Add(tag1);
            context.Tags.Add(tag2);
            context.Tags.Add(tag3);
            context.Tags.Add(tag4);
            context.Tags.Add(tag5);
            context.Tags.Add(tag6);
            context.Tags.Add(tag7);
            context.Tags.Add(tag8);

            context.SaveChanges();

            var drill1 = new Drill { Name = "3-on-2, 2-on-1", Description = null, Tag = tag5 };
            var drill2 = new Drill { Name = "Perfection", Description = null, Tag = tag2 };
            var drill3 = new Drill { Name = "Alley Drills", Description = null, Tag = tag1 };
            var drill4 = new Drill { Name = "3-man Weave", Description = null, Tag = tag2 };
            var drill5 = new Drill { Name = "Form Shooting", Description = null, Tag = tag3 };
            var drill6 = new Drill { Name = "Elbow Shooting", Description = null, Tag = tag3 };
            var drill7 = new Drill { Name = "Motion", Description = null, Tag = tag7 };
            var drill8 = new Drill { Name = "Red", Description = "1-2-1-1 Full court press", Tag = tag8 };
            var drill9 = new Drill { Name = "23", Description = "2-3 zone", Tag = tag8 };

            context.Drills.Add(drill1);
            context.Drills.Add(drill2);
            context.Drills.Add(drill3);
            context.Drills.Add(drill4);
            context.Drills.Add(drill5);
            context.Drills.Add(drill6);
            context.Drills.Add(drill7);
            context.Drills.Add(drill8);
            context.Drills.Add(drill9);

            context.SaveChanges();

        }
    }
}