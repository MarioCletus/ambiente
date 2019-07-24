package ambiente.ambiente;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepository  extends JpaRepository <Usuario,Integer>{
	List<Usuario> findByNombre(@Param("nombre") String nombre);
	List<Usuario> findByUserName(@Param("userName") String userName);
	@Query(value="select magnitudes_id from Usuario_Magnitudes where usuario_id =:userId",nativeQuery=true)
	List<Integer>getMagnitudUsuario(Integer userId);
	@Query(value="select perfiles_id from Usuario_Perfiles where usuario_id =:userId",nativeQuery=true)
	List<Integer>getPerfilesUsuario(Integer userId);
	@Query(value="select calendarios_id from Usuario_Calendarios where usuario_id =:userId",nativeQuery=true)
	List<Integer>getCalendariosUsuario(Integer userId);
	@Query(value="select cultivos_id from Usuario_Cultivos where usuario_id =:userId",nativeQuery=true)
	List<Integer>getCultivosUsuario(Integer userId);

}
