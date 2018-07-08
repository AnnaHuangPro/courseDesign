package ddd.simple.service.user.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.user.User;
import ddd.simple.dao.user.UserDao;
import ddd.simple.service.user.UserService;

@Service
public class UserServiceBean extends BaseService implements UserService {
	@Resource(name="userDaoBean")
	private UserDao userDao;
	
	@Override
	public User saveUser(User user) {
		try {
			return this.userDao.saveUser(user);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveUser", e.getMessage(), e);
		}
	}

	@Override
	public int deleteUser(Long userId) {
		try {
			return this.userDao.deleteUser(userId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteUser", e.getMessage(), e);
		}
		
	}

	@Override
	public User updateUser(User user) {
		try {
			return this.userDao.updateUser(user);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateUser", e.getMessage(), e);
		}
	}

	@Override
	public User findUserById(Long userId) {
		try {
			return this.userDao.findUserById(userId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findUserById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<User> findAllUser() {
		try {
			return this.userDao.findAllUser();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllUser", e.getMessage(), e);
		}
	}

}
