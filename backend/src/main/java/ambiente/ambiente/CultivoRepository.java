package ambiente.ambiente;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CultivoRepository extends JpaRepository <Cultivo,Integer> {
	@Query(value="select Dias_Id from Cultivo_Dias where Cultivo_id =:cultivoId",nativeQuery=true)
	List<Integer>getDiasCultivo(Integer cultivoId);
	
	@Query(value="select Perfil_Id from Dia where Perfil_Id =:perfil_id",nativeQuery=true)
	List<Integer>getPerfilesCultivo(Integer perfil_id);
	
	@Query(value="select Perfil_Id from Dia where Perfil_Id =(select Dias_Id from Cultivo_Dias where Cultivo_id =:cultivoId)",nativeQuery=true)
	List<Integer>getPerfilCultivo(Integer cultivoId);
}
