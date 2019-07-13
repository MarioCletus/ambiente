package ambiente.ambiente;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepository  extends JpaRepository <Usuario,Integer>{
	List<Usuario> findByNombre(@Param("nombre") String nombre);
	List<Usuario> findByUserName(@Param("userName") String userName);
}
