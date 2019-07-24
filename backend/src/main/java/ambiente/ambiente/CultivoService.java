package ambiente.ambiente;

import java.util.List;
import java.util.Optional;

public interface CultivoService {
	void nuevoCultivo( Cultivo cultivo);
	void editarCultivo(Cultivo cultivo);
	void borrarCultivo(Integer id);
	Optional<Cultivo> getCultivo(Integer id);
	List<Cultivo> getCultivos();
	List<Perfil>getPerfilesCultivos(Integer id);
}
