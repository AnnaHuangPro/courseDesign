package ddd.simple.action.user;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.user.User;
import ddd.simple.service.user.UserService;

@Action
@RequestMapping("/DD/User")
@Controller
public class UserAction {
	@Resource(name="userServiceBean")
	private UserService userService;
	
	public User saveUser(User user) {
		try {
			User saveUser = this.userService.saveUser(user);
			return saveUser;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteUser(Long userId) {
		
		try {
			return this.userService.deleteUser(userId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public User updateUser(User user) {
		try {
			User updateUser = this.userService.updateUser(user);
			return updateUser;
		} catch (DDDException e) {
			throw e;
		}
	}

	public User findUserById(Long userId) {
		try {
			User findUser = this.userService.findUserById(userId);
			return  findUser;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<User > findAllUser() {
		try {
			EntitySet<User > allUser = this.userService.findAllUser();
			return allUser;
		} catch (DDDException e) {
			throw e;
		}
	}

}