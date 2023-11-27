namespace Domain.Entities.Shop
{
    public class Product : BaseEntity
    {
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public string? ProductType { get; set; }
        public string? ProductImgUrl { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
    }
}