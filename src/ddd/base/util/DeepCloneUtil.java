package ddd.base.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public class DeepCloneUtil {
	@SuppressWarnings("unchecked")
	public static <T extends Serializable> T clone(T obj) throws Exception {
		ByteArrayOutputStream bout = new ByteArrayOutputStream();
		ObjectOutputStream oos = new ObjectOutputStream(bout);
		oos.writeObject(obj);

		ByteArrayInputStream bin = new ByteArrayInputStream(bout.toByteArray());
		ObjectInputStream ois = new ObjectInputStream(bin);
		return (T) ois.readObject();
	}
}
