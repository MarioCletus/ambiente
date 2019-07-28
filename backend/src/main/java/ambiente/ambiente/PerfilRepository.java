package ambiente.ambiente;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface PerfilRepository extends JpaRepository <Perfil,Integer>{
	@Query(value="select magnitudes_id from perfil_magnitudes where perfil_id =:perfilId",nativeQuery=true)
	List<Integer>getMagnitudesPerfil(Integer perfilId);

	
}