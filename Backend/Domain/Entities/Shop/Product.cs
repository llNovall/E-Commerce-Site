namespace Domain.Entities.Shop
{
    public class Product : BaseEntity
    {
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}