namespace ERandevu_Domain.Entities
{
    public class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string TCKimlikNo { get; set; }
        public string Phone { get; set; }
        
        public int? UserId { get; set; } // Link to Auth User
        public User User { get; set; }
    }
}
