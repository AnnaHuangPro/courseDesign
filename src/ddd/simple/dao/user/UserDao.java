package ddd.simple.dao.user;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.user.User;

public interface UserDao extends BaseDaoInterface {
	public User saveUser(User user) throws Exception;
	
	public int deleteUser(Long userId) throws Exception;
	
	public User updateUser(User user) throws Exception;
	
	public User findUserById(Long userId) throws Exception;
	
	public EntitySet<User> findAllUser() throws Exception;
}
