package ambiente.ambiente;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CultivoRepository extends JpaRepository <Cultivo,Integer> {
	@Query(value="select perfiles_id from Cultivo_Perfiles where Cultivo_id =:cultivoId",nativeQuery=true)
	List<Integer>getPerfilesCultivo(Integer cultivoId);
	

}
