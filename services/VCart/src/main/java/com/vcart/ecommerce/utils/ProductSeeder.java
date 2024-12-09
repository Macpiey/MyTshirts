package com.vcart.ecommerce.utils;

import com.vcart.ecommerce.entity.Product;
import com.vcart.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
public class ProductSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            // Shirts
            Product shirt1 = new Product();
            shirt1.setName("Men's Oxford Shirt");
            shirt1.setDescription("Classic Oxford shirt with a tailored fit, perfect for both casual and formal occasions.");
            shirt1.setPrice(BigDecimal.valueOf(49.99));
            shirt1.setCategory("Shirts");
            shirt1.setCustomizable(true);
            shirt1.setImageUrl("https://blakemill.co.uk/cdn/shop/articles/oxford-shirts-in-the-workplace-nailing-the-business-casual-look-739222.webp?crop=center&height=1200&v=1730485030&width=1200"); 

            Product shirt2 = new Product();
            shirt2.setName("Women's Linen Shirt");
            shirt2.setDescription("Lightweight linen shirt offering breathability and a chic silhouette.");
            shirt2.setPrice(BigDecimal.valueOf(59.99));
            shirt2.setCategory("Shirts");
            shirt2.setCustomizable(true);
            shirt2.setImageUrl("https://media.glamour.com/photos/6493184ac651730826b85a9a/16:9/w_2580%2Cc_limit/1487024771"); 

            // T-shirts
            Product tshirt1 = new Product();
            tshirt1.setName("Men's V-Neck T-Shirt");
            tshirt1.setDescription("Soft cotton V-neck T-shirt available in multiple colors for versatile styling.");
            tshirt1.setPrice(BigDecimal.valueOf(29.99));
            tshirt1.setCategory("T-shirts");
            tshirt1.setCustomizable(true);
            tshirt1.setImageUrl("data:image/jpeg;base64,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"); 

            Product tshirt2 = new Product();
            tshirt2.setName("Women's Graphic Tee");
            tshirt2.setDescription("Stylish graphic print T-shirt that makes a bold statement.");
            tshirt2.setPrice(BigDecimal.valueOf(34.99));
            tshirt2.setCategory("T-shirts");
            tshirt2.setCustomizable(true);
            tshirt2.setImageUrl("data:image/jpeg;base64,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"); 

            // Pants
            Product pants1 = new Product();
            pants1.setName("Men's Slim Fit Jeans");
            pants1.setDescription("Durable slim fit jeans with a modern cut, perfect for everyday wear.");
            pants1.setPrice(BigDecimal.valueOf(59.99));
            pants1.setCategory("Pants");
            pants1.setCustomizable(true);
            pants1.setImageUrl("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw8NDw8QDQ8PDQ4NDw0NDQ8NDw0PFREWFxURFRYYHSogGRolGxUWITIhJSkrLi4uFyAzODMsNygtLisBCgoKDg0OFQ8PGCsdHR8tNy0tLS0tLS0tLSstLS0tLS0tLS0tLS0rLS0rLS0tKy0tLS0tLS0tLSstLS0rKy03K//AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAABAgADBAYHBf/EAEQQAAIBAgMDCQQGBwcFAAAAAAABAgMRBBIhBQYxBxMiQVFhcYGRFKGisSMyQlKSwTNicoKjwvAVJCVDsrPhU2Rz0fH/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQMEAgX/xAAhEQEBAAEEAwADAQAAAAAAAAAAAQIDESExEjJBIjNCI//aAAwDAQACEQMRAD8A22JfApgXwPD2tiWQK4lsSodFiEiOhFOhkAZFBQ4qGAIQIIRgbfv7JibcXQqL1i0zjW36sozydSVmdh3nk1gsS1x5r3NpP3XOP7xL6e/3opmefbfS6rpW4eA5vAYao1aU67xPlN82vgys3aHFvyPA3Yh/h+CXZg8N6qnF/M2CnwNcZwwyu9tJWVyiqsy70ZMkY70ZUYjd1YxcVfJO33W7LrsZVVWZTJ9YHB9r0JU8djadR3nHFVrvtvNtP0aOj8jtRezYqnfpRxaqNfqzpRSfwP0Ofb3TvtXH9+J/kibNySV3HHVqP2amEc5L9anUhlfpOXqYz2b5c4OtAYwGjViUAzFAgGEACsAWKQBiMdiMBWKMxQIQASDyYF8CmBkQCrIFsSuKLYgPEeIiLIlDIZAQyAKGAkFAEYAUEYO36WfCYqK4vDVreKg2vkcW20ulB9sVY7xKCacXqmmmu1PicO3iw7hlhLV0pTot98JZX8jLU7jfSvFjq+6kn/ZmGfWsO35Ju3uNjoO8U+5Gr7v4hUtkUazWaMMBzriuLtTcmkJs/fOq6MJzwShJq+VYq9kl13pp+43xlsc+VkrbpXMepFmqy36qZsrwkYXdot4jPm6Lk9Mi4JM8uO/eMqZXClhacZLW6rVZK98vXFXvbTv4nrxrz5RutSD7DHnTdnbsNClyg4znXFQwlSlzypqUadeM8rllu1ntfuv1MWpvvjc8oWwml9Y0MRmjZtO96ll5seNXyjVt7cLba2L71hp6dvstLN8SkexyWRvtKb7MFWf8Skjy9vVZVMVSxLak8Rg5qbgkoqvSqzjJJa26EqTtd/WPd5JKV8Zian3MKoec6sX/ACMws2zdEv8Am6qRkIaMSyAMxQIxGOKArFCwEAYjHYrARisZigAhLEIPMgi+JTAviFWxLIlcSyIFiHiIixFDIZCodAMEAUEojIUZAE5ZygYTLXrrqlKNWP70E38SkdUOecpEGq0ZWvGVBSt15k5L0PGp010vZ6OxcbTWwaUp3lGWHeEai7PNKpKja/Vq/RM8FUasKbhF6OOSyyy6KVkrud3pp/wYm7G0o1NmVcFK05U9o0HGn1qlUlzl+9ZqdVnuVaUrfUUl284/k017zq0Z+O7l1uMtmuqjXvopK8pSVpQT1urLLwSWlteL1L6Gz7KMWmrcOm1ZaadZlzTXZDuSjIwMZVknF3atKOlsul9Wb7SRjzWBVoQ566ioJZXfV5eGi7eCKtr2q82krqCcVLTM3xbkr2d3fwuypV5TctetXfCyaXH0MyjQUuF5PtXD+vMmyvKk7QjGz+irzcW0kksRS1jx/wC2XvN55HaPRxtXtnQpfhU2/wDWjS8Z0XXpvjfD1lZPTLCvHr/8vuN45HG+Yxitp7RBqXU3zeq8rL1OLP8AZXZj+qOhsAQFeQYozFAgrGAwEYozAQKxGPIS4CsUaQgBIAIHmwLolUC6BFWRLYiRLIgWRHQkR0UMhoijoAhREFBKKGQqGAJzvlCrN4nJfRYeC8Lylc6Ic95U9nTSp46DtG0aFbXhdtQn8b9InnObxppXbJpG5VFS2nCDenMVp5W2lKUXFLTrdpS49rOqYqLS6KT/AGrv5HPuTqgniqtdyu4YWNK1rPNOp0v9o3nH1ZK+XRdzVzfS9Iw1vevDx+KqQzdCm13NJ+81nG7TpzUlOao3TXSafHjax6m1XHVu99eLvf3mq7X2a3Sp4tfUjifZ7JcZc3n+SNt+GM7Z2CoqcrU4TqRb0UXGnC1+uT1dr9SRtmEwqhBPJFN6WWvUeLsKatGNk+9aWNhqvKvlrc9XpN2jbVqqU67Vv0rh+7Do/OLN+5Hay9nxdLrjio1X4Tpxiv8AbZzqpCKljLp5o1VkvwyuUpT984HQOR/AzjSxOKbtCrKnSjG31nBNuXx28mfP/uu++kdEAEDNGQACwAKyMLAAoozFIFkVlkyoCSK2OxWALkFIQYcC+CKYouiFWRLYlcUWxAeKGQEMihkOhUMAUFAQUAyGFQyCISxAgrWquwcLhajqYelGi67vUjC6g3HhaPCP1nwKcdHR+Fz2dscab/bXyPIxvBm2PUY5d1pW2LWkZ23Nlc3u/Sm+jL2qhjOFv0kubivwTiUVsPz1anRX+bWhT7lmmk35I3HlGoX2ViYxWkfZ2kupRr0/yPWV6iYzuue7uRu126WZsteKafojXN2dFfuVjZZcDTJ4eNsncOtjamIqzxCoYaVWSiox5yo5KylpoktFrd8OB0/ZWz6eFoU8NRWWnTjlXa2225PvbbfmYm69O2GT+9Uqy+Jr8j1Tks5rpmVsiACQKArGYGAorGAwFkLcZiMgEissYjASQkmWSK5AKQhCDFiXRRVEuiFWRLYlUS2IDoZCoeJQ0RgJBAZBQEFAFDAQQIEAQjzNtP8AR+M/kjX9oTaT8D3Nsr6Wlr9iV13XWv8AXYa/tqXV8zox6jDLusDdqlzmPo9kOcqvyg0vicTcN7o32fje7C1pfhi5fka3uHBPFV58XCgoJ6famm/D6vvNl3sa/s/G30XseIX8N2PGd/KPWHq5fu7qvSx71erojX923dJf1Y9yvBtp9RtWbfNgxthaPfDN+Jt/mZxXhIZadOPDLThH0ikWHNXROkIyEIoC3GAwFYGEDAWQjHYrIFZWx2IArEkOyuRApCEAoiWxK4FsUFWRRZESJZEB0MhUMih0FAQUAyCgIKAZBAggEgAhGu7Uqt4pxvpGMNO1WT+bZ4m1dZNd2noeztWX96a7oX9EeDteolOT7jonUc97r1dw8C489iWssZtUofrZW80vWy8me1vTSz4DGRva+FrO70WkG/yK908SqmEptaZHKk7dsX/6aMDlGxDhs+pZ2z1KUH4ZrtfCZXnJrJti59u03e3d28DZZU3K0Y/Wl0Y+MtF8zXd2adk2+Mu3jY2/ZFPNiaMeNp533ZU5fkja1lI3RK2nZoQhDnboAJAoCtjMVgAVjCsBWKxmKyBZCNjMVgIxJDsrkQABCAVwRbErgWRCrEWRK0WIB0MhUMih0FCpjAMFCoKAdBEGTAJCEA1PblW2IqPsUdLd3E07H4zNKXibXvRK1Wo+1xXrTiaHiZdKX7R2YziOW9103cGP9xjL79arL4rfymu8q2Pf0GGT0s6013t5YvytL1Nk3EX+HUO+Vd/xpr8jnnKDinV2hWX2aeWiuy8Y9JfibMJ71rlxhGJsnE5LM3rcZurVq1XwhTUF4zlf5Q95zzCcDqu42E5vCKT41Zyn+6uiv9LfmaanGLxh22EhAHO3EBAXAgoRbgRgZGBkAYjGYjYAbEYzYjADK5DSK2QAgCALAsiVxQ6CrUPFlcR0BYmMmVoZFFiYyYlwpgOmMmVjJgPcNxAgNcKYgbgadvlpVt95Rl8NvyNGxb1a70jdt76iliYx/wCnSWbxbv8AJo0mpDPPIvtTUb+LsdmHrHLl7V1vdmjkweFg1Z8xCTXY5rM/fJnGdt1c9epJ8alarU/FNs7lUkoRk+qEW/JL/g4Pi23WlJ24tRXYuox0/rTP4zsBSc5Qpx+tKajHvbaSO14ajGnCFKP1YQjCPglY5huDhOcxkJNXVGEqvde2WPndp+R1Eat+Lpz6e4LiguZNDXBcW5LgG4GwXBcgNxWyNitgRsVsjYrYAbFYWI2QLJiMZsRgC4RSEFypDqmZPNhUCqx1TGUDIyhygUZAqBeohylFOUOUtyhygVZQ5SzKTKAlg2HsSwCWJYssSwHP98MQqdaonrKVmlxaSil2cNDWtl2nisPHjmxFBNWt/mR0Nt31wVV1JTpxTzZelJOytFKysu59fWavg8Li6WJoy5mUqkatKpG1OazLNG3FcLe465lPHtzXG+To29mM5jBYir15Mi8ZNR/M4lQqZpOV8zbu2dl362ZUxOEdKnKMbVIzkp3SlFX0uk+2/kc6we4leonJ1VTeZR6E5tK/XrZdmhhhnMe2uWNt4btycYHJhp13xrTyr9mF1p5t+httjxdzdm1MLhuZqVnXaqScb2+ji0uhp33fjJnutHnK73d6k2hCWGaFZFADC2I5EEIwXA2BGK2RsUCCsZi2ADEkWWFygVMVlzgK4EFNiFuQgHq5A5SzKTKFJlJlHsFICvKSxYSxQlgWHsGwFdg2HsCwC2APYlgEIPYoxuLp0Kcq1VTlCKu1SpTrT8oxTb8kAXPpKz0inm1lZt200dtEjzK1bp5tXmmrJWfXx7u08ityhbHm8ntPMy4fS0K+Hafi4otdWjiFGeHm6sb3zxnOcX6u3/xGdWPV27P6N9SfHoOS9VrHxtYx9gunOimtb5ouycoys7NXWjD/AGW5rpt+FzOwOFlQhlpZXq5Zajla771w9BZvdzfhKNCpTbfGD4RySjJdmrsrW7vMWWMs7WZ422K23pPLh47OpR+9N4itP3pL3GXsrCYvJH2mUJ1ftSgrRfgklY9TeIzvaW+onONl0aA/NHoY92RJmRzZMgFGUOUvyEygUZA5C/ITKBRkJkLspMoFPNg5svygsBRkJkL7EsBj82QyLEAygkIREIQgEsSxCFEsSxCABohCAQASBQFauQgFE8HSk7unCT7XCLY8aUVokl3JJEIA1iWIQCWJYhAJYhCAQhCAQhCAQliECIQBAIQhABYFgkChYJCAf//Z"); 

            Product pants2 = new Product();
            pants2.setName("Women's High-Waisted Trousers");
            pants2.setDescription("Elegant high-waisted trousers offering comfort and style for any occasion.");
            pants2.setPrice(BigDecimal.valueOf(69.99));
            pants2.setCategory("Pants");
            pants2.setCustomizable(true);
            pants2.setImageUrl("https://m.media-amazon.com/images/I/71heu18BXxL._AC_UY350_.jpg"); 

            // Sweatpants
            Product sweatpants1 = new Product();
            sweatpants1.setName("Men's Jogger Sweatpants");
            sweatpants1.setDescription("Comfortable jogger sweatpants with an elastic waistband and cuffs.");
            sweatpants1.setPrice(BigDecimal.valueOf(39.99));
            sweatpants1.setCategory("Sweatpants");
            sweatpants1.setCustomizable(true);
            sweatpants1.setImageUrl("data:image/jpeg;base64,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"); 

            Product sweatpants2 = new Product();
            sweatpants2.setName("Women's Lounge Sweatpants");
            sweatpants2.setDescription("Soft lounge sweatpants perfect for relaxing at home or casual outings.");
            sweatpants2.setPrice(BigDecimal.valueOf(44.99));
            sweatpants2.setCategory("Sweatpants");
            sweatpants2.setCustomizable(true);
            sweatpants2.setImageUrl("https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQTzivUFKf-mkudvpUqwjiWwqgU_Y4HrOjs0DNnNPrfHMoBgtSbweHeEd4o3DRTwIkGQqc0JF6p8o8APng3Jmouz5UKbhiVQEej-hCpmHRhBD4fVtbiQ1vAEg"); 

            // Sweatshirts
            Product sweatshirt1 = new Product();
            sweatshirt1.setName("Men's Crewneck Sweatshirt");
            sweatshirt1.setDescription("Classic crewneck sweatshirt with a comfortable fit and soft fabric.");
            sweatshirt1.setPrice(BigDecimal.valueOf(49.99));
            sweatshirt1.setCategory("Sweatshirts");
            sweatshirt1.setCustomizable(true);
            sweatshirt1.setImageUrl("https://m.media-amazon.com/images/I/51ibyRFAikL._SX679_.jpg"); 

            Product sweatshirt2 = new Product();
            sweatshirt2.setName("Women's Hoodie Sweatshirt");
            sweatshirt2.setDescription("Stylish hoodie sweatshirt featuring a front pocket and adjustable drawstrings.");
            sweatshirt2.setPrice(BigDecimal.valueOf(54.99));
            sweatshirt2.setCategory("Sweatshirts");
            sweatshirt2.setCustomizable(true);
            sweatshirt2.setImageUrl("https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRoAIZuALPM9x2AX6TPD6pu6PA7ltqReAO6uRqqoGK23NyZLdKnbvqBH8grxYAmbdP70xSnbjgm0nwadM0YLElVgHX8xFmXGx7wLxULfjZD5pWghLy7oQ53"); 

            
            productRepository.saveAll(Arrays.asList(
                    shirt1, shirt2,
                    tshirt1, tshirt2,
                    pants1, pants2,
                    sweatpants1, sweatpants2,
                    sweatshirt1, sweatshirt2
            ));

            System.out.println("Sample products added to the database!");
        }
    }
}
