package com.example.demo;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.entity.User;
import com.example.repository.UserRepository;
import com.example.service.UserService;
@RunWith(SpringRunner.class)
@SpringBootTest(classes = UserRepository.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)

public class DropboxServerApplicationTests {

	 private UserRepository userRepository;
	    private UserService userService;

	    @Before
	    public void setUp() {
	        userService = Mockito.mock(UserService.class);
	        userRepository = Mockito.mock(UserRepository.class);
	    }

	    @Test
	    public void findUserByEmailAndPassword() {
	        List<User> u = new ArrayList<User>();
	        List<User> user = userRepository.findByEmailAndPassword("abc","abc");
	        assertEquals("User found",u,user);
	    }

	    @Test
	    public void findBySharedWith() {
	        List<User> u = new ArrayList<User>();
	        List<User> user = userRepository.findByEmailAndPassword("abc","abc");
	        assertEquals("User found",u,user);
	    }

	    @Test
	    public void signUp() {
	        User user = new User();
	        user.setPassword("password");
	        user.setLastName("last");
	        user.setFirstName("first");
	        user.setEmail("Email@email.com");
	        user.setContactInfo("21365475");
	        user.setLifeEvents("event");
	        user.setEducation("edu");
	        user.setWork("work");
	        user.setOverview("ovrview");
	        userService.addUser(user);
	        String usreidDatabase = String.valueOf(user.getId());
	        String userid = "10";
	        assertEquals("User Creted",usreidDatabase,userid);
	    }

	    @Test
	    public void signIn() {
	        // Test for signIn
	    }

	    @Test
	    public void signOut() {
	        // Test for signOut
	    }

	    @Test
	    public void getDocs() {
	        // Test for getDocs
	    }

	    @Test
	    public void createFolder(){
	        // Test for createFolder
	    }

	    @Test
	    public void shareDoc() {
	        // Test for shareDoc
	    }


}
