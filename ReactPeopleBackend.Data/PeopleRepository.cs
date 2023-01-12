using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleBackend.Data
{
    public class PeopleRepository
    {
        private string _connectionString;
        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }

        public void Add(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void UpdatePerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($@"UPDATE People SET FirstName = {person.FirstName}, LastName = {person.LastName}, 
                Age = {person.Age} WHERE Id = {person.Id} ");
            context.SaveChanges();
        }

        public void DeletePerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Remove(context.People.FirstOrDefault(p => p.Id == person.Id));
            context.SaveChanges();
        }
    }
}
