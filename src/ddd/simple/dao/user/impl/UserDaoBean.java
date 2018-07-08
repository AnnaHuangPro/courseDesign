package ddd.simple.dao.user.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.user.User;
import ddd.simple.dao.user.UserDao;

@Service
public class UserDaoBean extends BaseDao implements UserDao {
	@Override
	public User saveUser(User user)  throws Exception {
		return this.save(user);
	}

	@Override
	public int deleteUser(Long userId)  throws Exception {
		return this.deleteById(userId,User.class);
	}

	@Override
	public User updateUser(User user)  throws Exception {
		return this.update(user);
	}

	@Override
	public User findUserById(Long userId)  throws Exception {
		return this.query(userId, User.class);
	}
	
	@Override
	public EntitySet<User> findAllUser() throws Exception {
		return this.query("1=1",User.class);
	}
}
