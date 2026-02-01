namespace ERandevu_Domain.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }

        // 👇 BUNU EKLE
        public ICollection<User> Users { get; set; }
    }
}
