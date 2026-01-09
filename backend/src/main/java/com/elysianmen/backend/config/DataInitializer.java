package com.elysianmen.backend.config;

import com.elysianmen.backend.model.Product;
import com.elysianmen.backend.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

        @Autowired
        private IProductService productService;

        @Override
        public void run(String... args) throws Exception {
                // Check if products already exist
                if (productService.getProductCount() > 0) {
                        System.out.println("Database already initialized with " + productService.getProductCount()
                                        + " products");
                        return;
                }

                System.out.println("Initializing database with product data...");

                List<Product> products = Arrays.asList(
                                // SHIRTS
                                new Product("s1", "Cotton Oxford Blue", 25500.0, null, "Shirts",
                                                "A timeless classic in breathable cotton. Perfect for both office and weekend wear.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/IRE_2918_1270x.jpg?v=1755103469",
                                                Arrays.asList("Light Blue", "White"),
                                                Arrays.asList("S", "M", "L", "XL"), "Slim Fit", true,
                                                false),

                                new Product("s2", "Linen Vacation Stripe", 18000.0, 22500.0, "Shirts",
                                                "Relaxed fit shirt crafted from high-quality European linen.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/0y2a8022_1170x.jpg?v=1753177606",
                                                Arrays.asList("Stripe Blue", "Beige"), Arrays.asList("M", "L", "XL"),
                                                "Relaxed Fit", true,
                                                true),

                                new Product("s3", "Grandad Collar White", 27000.0, null, "Shirts",
                                                "Minimalist band-collar shirt in a crisp cotton poplin.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/IRE_2910_1270x.jpg?v=1755103246",
                                                Arrays.asList("Off-White", "Stone"), Arrays.asList("S", "M", "L"),
                                                "Slim Fit", true, false),

                                // SHOES
                                new Product("sh1", "Heritage Oxford Walnut", 38500.0, null, "Shoes",
                                                "Classic wingtip oxford in premium calfskin leather with a hand-burnished finish.",
                                                "https://shoes.lk/cdn/shop/files/227.png?v=1766916199&width=360",
                                                Arrays.asList("Walnut"), Arrays.asList("7", "8", "9", "10", "11"),
                                                "Standard", true, false),

                                new Product("sh2", "Artisan Derby Brown", 36000.0, null, "Shoes",
                                                "Versatile derby shoe featuring a durable rubber sole for all-day comfort.",
                                                "https://shoes.lk/cdn/shop/files/67_ebd97e29-a224-4a09-aa63-2f300cca66df.png?v=1765305337&width=360",
                                                Arrays.asList("Dark Brown"), Arrays.asList("7", "8", "9", "10", "11"),
                                                "Standard", true, false),

                                new Product("sh3", "Modern Monk Strap", 41000.0, null, "Shoes",
                                                "Sleek double monk strap design for a sharp, contemporary professional look.",
                                                "https://shoes.lk/cdn/shop/files/65.png?v=1765304642&width=360",
                                                Arrays.asList("Black"), Arrays.asList("8", "9", "10"), "Standard", true,
                                                false),

                                new Product("sh4", "Elysian Loafer Tan", 34500.0, null, "Shoes",
                                                "Refined penny loafer in soft suede, perfect for smart-casual summer styling.",
                                                "https://shoes.lk/cdn/shop/files/68_8748425f-b5a8-46d6-91e7-937c34ffdf13.png?v=1765304504&width=360",
                                                Arrays.asList("Tan"), Arrays.asList("7", "8", "9", "10"), "Standard",
                                                true, false),

                                new Product("sh5", "Urban Leather Sneaker", 29500.0, null, "Shoes",
                                                "Minimalist white leather sneakers that define modern versatility.",
                                                "https://shoes.lk/cdn/shop/files/NKM003_3ce82ce7-500f-4d90-8d51-620331aa692c.png?v=1751365889&width=360",
                                                Arrays.asList("White"), Arrays.asList("7", "8", "9", "10", "11"),
                                                "Standard", true, false),

                                new Product("sh6", "Midnight Chelsea Boot", 45000.0, null, "Shoes",
                                                "Architectural Chelsea boots in matte black leather with elastic gussets.",
                                                "https://shoes.lk/cdn/shop/files/NKS001_18be14ea-7189-4429-8fa1-8025163a4253.png?v=1751539757&width=360",
                                                Arrays.asList("Black"), Arrays.asList("8", "9", "10", "11"), "Standard",
                                                true, false),

                                new Product("sh7", "Rustic Suede Boot", 43000.0, null, "Shoes",
                                                "Hand-finished suede boots with a rugged yet refined profile.",
                                                "https://shoes.lk/cdn/shop/files/NKS002_244dc9f1-4154-453a-8544-893761695a08.png?v=1751539485&width=360",
                                                Arrays.asList("Tobacco"), Arrays.asList("7", "8", "9", "10"),
                                                "Standard", true, false),

                                new Product("sh8", "Contemporary Brogue", 39500.0, null, "Shoes",
                                                "Intricate wingtip detailing paired with a modern wedge sole.",
                                                "https://shoes.lk/cdn/shop/files/NKS003_16dd92ef-21b1-48b4-885e-e3ba7726249f.png?v=1751539617&width=360",
                                                Arrays.asList("Oxblood"), Arrays.asList("8", "9", "10", "11"),
                                                "Standard", true, false),

                                new Product("sh9", "Sovereign Evening Shoe", 48000.0, null, "Shoes",
                                                "The pinnacle of formal footwear, high-shine patent leather for your most special occasions.",
                                                "https://shoes.lk/cdn/shop/files/79.png?v=1766918685&width=360",
                                                Arrays.asList("Black Patent"), Arrays.asList("8", "9", "10"),
                                                "Standard", true, false),

                                // BAGS
                                new Product("b1", "Heritage Leather Duffle", 42500.0, null, "Bags",
                                                "The ultimate travel companion, crafted from rich, full-grain leather that patinas beautifully over time.",
                                                "https://bag.lk/wp-content/uploads/2025/12/10-4.webp",
                                                Arrays.asList("Cognac"), Arrays.asList("OS"), "Standard", true, false),

                                new Product("b2", "Executive Briefcase", 38000.0, null, "Bags",
                                                "Command the boardroom with this structured leather briefcase, featuring dedicated compartments for tech and documents.",
                                                "https://bag.lk/wp-content/uploads/2025/12/7612.webp",
                                                Arrays.asList("Black"), Arrays.asList("OS"), "Standard", true, false),

                                new Product("b3", "Signature Slim Portfolio", 22500.0, null, "Bags",
                                                "A minimalist approach to professional carry, designed for the modern minimalist.",
                                                "https://bag.lk/wp-content/uploads/2025/12/7612_4.webp",
                                                Arrays.asList("Ebony"), Arrays.asList("OS"), "Standard", true, false),

                                new Product("b4", "Nomad Travel Holdall", 45000.0, null, "Bags",
                                                "Spacious and durable, this holdall is built for short escapes and weekend getaways.",
                                                "https://bag.lk/wp-content/uploads/2025/12/7612-1.webp",
                                                Arrays.asList("Mahogany"), Arrays.asList("OS"), "Standard", true,
                                                false),

                                new Product("b5", "Urban Commuter Backpack", 31500.0, null, "Bags",
                                                "Blending functionality with a sleek urban aesthetic, perfect for daily transit.",
                                                "https://bag.lk/wp-content/uploads/2025/12/1-7.webp",
                                                Arrays.asList("Dark Brown"), Arrays.asList("OS"), "Standard", true,
                                                false),

                                new Product("b6", "Vintage Messenger Bag", 28500.0, null, "Bags",
                                                "Inspired by classic silhouettes, this messenger bag offers easy access and a rugged charm.",
                                                "https://bag.lk/wp-content/uploads/2025/12/6886-1.webp",
                                                Arrays.asList("Tan"), Arrays.asList("OS"), "Standard", true, false),

                                new Product("b7", "Craftsman Crossbody", 19500.0, null, "Bags",
                                                "Compact and secure, ideal for your essential daily carry items.",
                                                "https://bag.lk/wp-content/uploads/2025/12/15-2048x2048.webp",
                                                Arrays.asList("Chocolate"), Arrays.asList("OS"), "Standard", true,
                                                false),

                                new Product("b8", "Artisan Leather Tote", 24000.0, null, "Bags",
                                                "Hand-stitched leather tote with an open top for easy access and a refined look.",
                                                "https://bag.lk/wp-content/uploads/2025/12/ChatGPT-Image-Dec-13-2025-05_34_38-PM.webp",
                                                Arrays.asList("Sienna"), Arrays.asList("OS"), "Standard", true, false),

                                new Product("b9", "Premium Laptop Sleeve", 15500.0, null, "Bags",
                                                "Sleek protection for your hardware, lined with soft microfiber.",
                                                "https://bag.lk/wp-content/uploads/2025/12/10-2048x2048.webp",
                                                Arrays.asList("Onyx"), Arrays.asList("OS"), "Standard", true, false),

                                // POLOS
                                new Product("p1", "Signature Pique Polo Navy", 12500.0, null, "Polos",
                                                "A classic pique knit with refined detailing and a perfect slim fit.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/SC__1183_1880x.jpg?v=1739189816",
                                                Arrays.asList("Navy"), Arrays.asList("S", "M", "L", "XL"), "Slim Fit",
                                                true, false),

                                new Product("p2", "Essential Polo Charcoal", 12500.0, null, "Polos",
                                                "Versatile charcoal polo made from premium long-staple cotton.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/SC__1167_1880x.jpg?v=1739190074",
                                                Arrays.asList("Charcoal"), Arrays.asList("S", "M", "L", "XL"),
                                                "Regular Fit", true, false),

                                new Product("p3", "Luxe Knit Polo Emerald", 14500.0, null, "Polos",
                                                "Sophisticated knit texture for a more formal take on the casual classic.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/IMG_2119-Edit_1270x.jpg?v=1723618426",
                                                Arrays.asList("Emerald"), Arrays.asList("M", "L", "XL"), "Slim Fit",
                                                true, false),

                                new Product("p4", "Sky Blue Pique Polo", 12000.0, null, "Polos",
                                                "Breathable and light, ideal for the tropical climate of Colombo.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/IMG_2181-Edit_1270x.jpg?v=1723617603",
                                                Arrays.asList("Sky Blue"), Arrays.asList("S", "M", "L"), "Regular Fit",
                                                true, false),

                                new Product("p5", "Classic White Polo", 12000.0, null, "Polos",
                                                "Crisp white polo with a subtly contrasting collar tipping.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/IMG_2241-Edit_1270x.jpg?v=1723615667",
                                                Arrays.asList("White"), Arrays.asList("S", "M", "L", "XL"), "Slim Fit",
                                                true, false),

                                new Product("p6", "Textured Melange Polo", 13500.0, null, "Polos",
                                                "A melange weave that adds depth and character to your ensemble.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/Untitleddesign_5_b1047592-abc1-423b-83fb-348407e9bdf9_1570x.png?v=1712139687",
                                                Arrays.asList("Grey Melange"), Arrays.asList("M", "L", "XL"),
                                                "Regular Fit", true, false),

                                new Product("p7", "Heritage Striped Polo", 14000.0, null, "Polos",
                                                "Iconic stripe design featuring a soft-wash finish for ultimate comfort.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/IRE_2940_1270x.jpg?v=1755103627",
                                                Arrays.asList("Navy/White"), Arrays.asList("S", "M", "L"), "Slim Fit",
                                                true, false),

                                new Product("p8", "Regatta Polo Red", 13000.0, null, "Polos",
                                                "Bold red with a structured collar that stays sharp all day.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/IRE_2946_1270x.jpg?v=1755103697",
                                                Arrays.asList("Red"), Arrays.asList("M", "L", "XL"), "Regular Fit",
                                                true, false),

                                // DENIMS
                                new Product("d1", "Selvedge Indigo Classic", 32500.0, null, "Denims",
                                                "Raw indigo denim crafted on vintage looms for the purist.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/SC__1257_1880x.jpg?v=1739794641",
                                                Arrays.asList("Raw Indigo"), Arrays.asList("30", "32", "34", "36"),
                                                "Regular Fit", true, false),

                                new Product("d2", "Stay Black Tailored", 29500.0, null, "Denims",
                                                "Deep black denim with a tailored silhouette.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/SC__1420_1880x.jpg?v=1738068126",
                                                Arrays.asList("Solid Black"), Arrays.asList("30", "32", "34", "36"),
                                                "Slim Fit", true, false),

                                new Product("d4", "Heritage Straight Fit", 31000.0, null, "Denims",
                                                "A classic straight leg in a mid-wash indigo, built for durability and comfort.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/SC__1246_1880x.jpg?v=1739794641",
                                                Arrays.asList("Indigo"), Arrays.asList("30", "32", "34", "36"),
                                                "Regular Fit", true, false),

                                new Product("d5", "Tapered Charcoal Denim", 30500.0, null, "Denims",
                                                "Washed charcoal finish with a modern tapered leg. Versatile and sharp.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/SC__1194_1880x.jpg?v=1739794558",
                                                Arrays.asList("Charcoal"), Arrays.asList("30", "32", "34", "36"),
                                                "Slim Fit", true, false),

                                // ACCESSORIES
                                new Product("acc1", "Artisan Woven Tie", 8500.0, null, "Accessories",
                                                "Exquisite silk tie with a subtle textured weave.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/WhatsAppImage2025-09-09at12.20.53_1880x.jpg?v=1757404256",
                                                Arrays.asList("Deep Blue"), Arrays.asList("OS"), "Standard", true,
                                                false),

                                new Product("acc2", "Signature Silk Square", 5500.0, null, "Accessories",
                                                "Hand-rolled edges and a refined geometric print.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/WhatsAppImage2025-09-09at12.20.54_1880x.jpg?v=1757404027",
                                                Arrays.asList("Burgundy"), Arrays.asList("OS"), "Standard", true,
                                                false),

                                new Product("acc3", "Modern Knit Tie", 7500.0, null, "Accessories",
                                                "A contemporary take on the necktie, perfect for smart-casual styling.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/WhatsAppImage2025-09-09at12.20.54_1_1880x.jpg?v=1757403274",
                                                Arrays.asList("Emerald"), Arrays.asList("OS"), "Standard", true, false),

                                new Product("acc4", "Classic Leather Belt", 12500.0, null, "Accessories",
                                                "Full-grain Italian leather with a brushed silver buckle.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/WhatsAppImage2025-09-09at12.20.55_1880x.jpg?v=1757403479",
                                                Arrays.asList("Tan"), Arrays.asList("32", "34", "36"), "Standard", true,
                                                false),

                                new Product("acc5", "Heritage Cufflinks", 9500.0, null, "Accessories",
                                                "Polished steel with a minimalist monogram engraving.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/WhatsAppImage2025-09-09at12.20.56_1880x.jpg?v=1757403615",
                                                Arrays.asList("Silver"), Arrays.asList("OS"), "Standard", true, false),

                                new Product("acc6", "Premium Wool Scarf", 15500.0, null, "Accessories",
                                                "Ultra-soft merino wool for timeless warmth.",
                                                "https://stripesandchecksinc.com/cdn/shop/files/WhatsAppImage2025-09-09at12.20.56_1_1880x.jpg?v=1757403888",
                                                Arrays.asList("Grey"), Arrays.asList("OS"), "Standard", true, false),

                                // CHINOS
                                new Product("c1", "Slim Fit Twill Chinos", 28500.0, null, "Chinos",
                                                "Stretch cotton twill chinos that transition perfectly from desk to dinner.",
                                                "https://images.unsplash.com/photo-1624371414361-e6e0ed2bf527?auto=format&fit=crop&q=80&w=800",
                                                Arrays.asList("Khaki", "Olive", "Black"),
                                                Arrays.asList("30", "32", "34", "36"), "Slim Fit",
                                                true, false),

                                new Product("c2", "Relaxed Tapered Chinos", 21000.0, 34500.0, "Chinos",
                                                "A more casual silhouette for effortless daily wear.",
                                                "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800",
                                                Arrays.asList("Grey", "Dusty Blue"), Arrays.asList("32", "34", "36"),
                                                "Relaxed Fit", true,
                                                true),

                                // SALE ITEMS
                                new Product("sale_m1", "Moose Comfort Fit Crew Neck - Patriot Blue", 3200.0, 4500.0,
                                                "Polos",
                                                "A premium comfort-fit crew neck t-shirt in a deep patriot blue shade.",
                                                "https://thilakawardhana.com/cdn/shop/files/TM15166.1_1880x.jpg?v=1765691538",
                                                Arrays.asList("Patriot Blue"), Arrays.asList("S", "M", "L", "XL"),
                                                "Regular Fit", true, true),

                                new Product("sale_m2", "Moose Everyday Essential Tee - White", 2800.0, 3800.0, "Polos",
                                                "The ultimate base layer. Soft, breathable cotton in a crisp white finish.",
                                                "https://thilakawardhana.com/cdn/shop/files/TM15163.1_1880x.jpg?v=1765628579",
                                                Arrays.asList("White"), Arrays.asList("S", "M", "L", "XL"),
                                                "Regular Fit", true, true),

                                new Product("sale_m3", "Mens Slim Fit Mid Washed Jean", 8500.0, 12500.0, "Denims",
                                                "Tailored slim fit with a classic mid-wash finish for a timeless look.",
                                                "https://thilakawardhana.com/cdn/shop/files/TM15161.2_1880x.jpg?v=1765628170",
                                                Arrays.asList("Mid Wash"), Arrays.asList("30", "32", "34", "36"),
                                                "Slim Fit", true, true));

                productService.saveAllProducts(products);
                System.out.println("Database initialized successfully with " + products.size() + " products!");
        }
}
