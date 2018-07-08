package ddd.simple.service.user;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.user.User;

public interface UserService extends BaseServiceInterface {
	public User saveUser(User user) ;
	
	public int deleteUser(Long userId) ;
	
	public User updateUser(User user) ;
	
	public User findUserById(Long userId) ;
	
	public EntitySet<User> findAllUser() ;
 
}