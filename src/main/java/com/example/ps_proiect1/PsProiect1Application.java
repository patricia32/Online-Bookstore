package com.example.ps_proiect1;

import com.example.ps_proiect1.model.*;
import com.example.ps_proiect1.repository.*;
import com.example.ps_proiect1.service.ClientService;
import com.example.ps_proiect1.service.impl.BookServiceImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class PsProiect1Application implements WebMvcConfigurer {


//    @Configuration
//    public class WebConfig implements WebMvcConfigurer {
//        @Override
//        public void addResourceHandlers(ResourceHandlerRegistry registry) {
//            registry.addResourceHandler("/**")
//                    .addResourceLocations("classpath:/static/","classpath:/image/")
//                    .setCachePeriod(0);
//        }
//    }
    public static void main(String[] args) { SpringApplication.run(PsProiect1Application.class, args);
    }

    @Bean
    CommandLineRunner init(List<Book> books, SimpMessagingTemplate template, ClientService clientService,
                          ActiveUserRepository activeUserRepository, AdminRepository adminRepository,  CartRepository cartRepository,ClientRepository clientRepository, ReviewRepository reviewRepository,UserRepository userRepository, BookRepository bookRepository, AuthorRepository authorRepository, PublisherRepository publisherRepository, OrderRepository orderRepository) {
        return args -> {
            BookServiceImpl bookServiceImpl = new BookServiceImpl(bookRepository, authorRepository, publisherRepository,clientService, reviewRepository, clientRepository, template);

            Client client = new Client();
            client.setName("Muresan Ioana");
            client.setUsername("ioanamuresan");

       /*     BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            String encryptedPwd = bcrypt.encode("pass");
            client.setPassword(encryptedPwd);*/

            client.setPassword("pass");
            client.setPoints(0);
            client.setPhone("0765458645");
            client.setAddress("Dorobantilor");
            client.setEmail("ioanaMuresan@gmail.com");

            Cart cart = new Cart(null, 0, client.getId(), new ArrayList<>());
            cartRepository.save(cart);
            client.setCart(cart);
            clientRepository.save(client);

            cart.setClientId(client.getId());
            cartRepository.save(cart);



            Admin admin = new Admin(3000);
            admin.setUsername("UsernameAdmin");

           // BCryptPasswordEncoder bcrypt1 = new BCryptPasswordEncoder();
//        String encryptedPwd1 = bcrypt.encode("password");
//        client.setPassword(encryptedPwd1);
            admin.setPassword("password");
            adminRepository.save(admin);


            bookServiceImpl.createBook("All the Bright Places", "Toate Locurile Luminoase", "JENNIFER NIVEN", "Penguin Books Ltd", "Young adult", "Adolescenți", 2015, 43, 32, 400,"/images/all-the-bright-places.jpg", "The Fault in Our Stars meets Eleanor and Park, All the Bright Places is a compelling and beautiful story about a girl who learns to live from a boy who intends to die.Theodore is fascinated by death,and he constantly thinks of ways he might kill himself.","All the Bright Places este o poveste convingătoare și frumoasă despre o fată care învață să trăiască de la un băiat care intenționează să moară. Theodore este fascinat de moarte și se gândește constant la modalități în care s-ar putea sinucide");
            bookServiceImpl.createBook("Take Me With You When You Go", "Ia-mă cu tine când mergi", "JENNIFER NIVEN", "Penguin UK", "Young adult", "Adolescenți", 2021, 49, 12, 336,"/images/take_me.png","Ezra Ahern wakes up one day to find his older sister, Bea, gone. No note, no sign, nothing but an email address hidden somewhere only he would find. Ezra never expects to be left behind by their abusive stepfather and neglectful mother.", "Ezra se trezește într-o zi și își găsește sora, Bea, plecată. Nicio notă, nici un semn, nimic altceva decât o adresă de e-mail ascunsă undeva numai el ar găsi-o. Ezra nu s-a așteptat să rămână în urmă cu tatăl lor abuziv și cu mama lor neglijentă." );
            bookServiceImpl.createBook("Not My Problem", "Nu e problema mea", "CIARA SMYTH", "Andersen Press Ltd", "Young adult", "Adolescenți", 2021, 58, 45, 400,"/images/not_my_problem.jpg", "When Aideen agrees to help ambitious class swot Maebh Kowalska deal with her crazy workload, she doesn’t expect to end up reluctantly pushing Maebh down the stairs. With this, Aideen becomes the school ‘fixer’: any problem a student has." ,"Când Aideen acceptă să o ajute pe ambițioasa swot de clasă Maebh Kowalska să facă față volumului ei de muncă nebun, ea nu se așteaptă să sfârșească prin a o împinge fără tragere pe Maebh pe scări. Cu aceasta, Aideen devine „reparatorul” școlii.");
            bookServiceImpl.createBook("Emergency Contact", "Contact de urgență", "MARY H. K. CHOI", "Simon & Schuster Books for Young Readers", "Young adult","Adolescenți", 2019, 35, 13, 416,"/images/emergency.jpg", "For Penny, high school was a nonevent. Her friends were okay, her grades were fine, and while she’d somehow landed a boyfriend,they never managed to know much about each other.Now Penny is heading to college in Austin to learn.","Pentru Penny, liceul nu a fost un eveniment. Prietenii ei erau în regulă, notele ei erau bune și, deși ea și-a găsit cumva un iubit, nu au reușit să știe prea multe unul despre celălalt. Acum, Penny se duce la facultate în Austin pentru a învăța.");
            bookServiceImpl.createBook("House of Hollow", "Casa Hollow", "KRYSTAL SUTHERLAND", "Hot Key Books", "Thriller", "Thriller", 2021, 51, 23, 304,"/images/HouseofHollow.jpg", "The Hollow sisters - Vivi, Grey and Iris - are as seductively glamorous as they are mysterious. They have black eyes and hair as white as milk. The Hollow sisters don't have friends - they don't need them. They move through the corridors like sharks.","Surorile Hollow - Vivi, Gray și Iris - sunt la fel de seducătoare de farmec, pe atât de misterioase. Au ochii negri și părul alb ca laptele. Surorile Hollow nu au prieteni - nu au nevoie de ei. Se deplasează pe coridoare ca rechinii.");
            bookServiceImpl.createBook("Beyond Disruption", "Dincolo de perturbare", " RENEE A. MAUBORGNE", "Harvard Business Review Press", "Economy", "Economie", 2023, 112, 46, 240,"/images/beyond.jpg", "Blue Ocean Strategy, the #1 global bestseller, forever changed how the world thinks about strategy. Now W. Chan Kim and Renee Mauborgne offer up a bold, new idea that will transform how we all think about innovation and growth..", "Blue Ocean Strategy, bestsellerul #1 la nivel mondial, a schimbat pentru totdeauna felul în care lumea crede despre strategie. Acum, W. Chan Kim și Renee Mauborgne oferă o idee îndrăzneață, nouă, care va transforma modul în care gândim.");
            bookServiceImpl.createBook("Blue Ocean Shift", "Oceanul albastru" ,"W. CHAN KIM", "Pan Books", "Business", "Afaceri", 2022, 68, 12, 334,"/images/shift.png", "Blue Ocean Shift is the essential follow-up to the classic Blue Ocean Strategy, the 3.6 million copy global bestseller by world-renowned professors W. Chan Kim and Renee Mauborgne.", "Blue Ocean Shift este continuarea esențială a clasicului Blue Ocean Strategy, bestsellerul global de 3,6 milioane de exemplare al profesorilor de renume mondial W. Chan Kim și Renee Mauborgne.");

            ActiveUser activeUser = new ActiveUser(1L, new ArrayList<>());
            activeUserRepository.save(activeUser);
        };
    }

}
