package ambiente.ambiente;

import java.util.List;
import java.util.Optional;

import ambiente.auxiliar.WrapperDia;

public interface CultivoService {
	Cultivo nuevoCultivo( Cultivo cultivo);
	void editarCultivo(Cultivo cultivo);
	void borrarCultivo(Integer id);
	Optional<Cultivo> getCultivo(Integer id);
	List<Cultivo> getCultivos();
	List<Perfil>getPerfilesCultivos(Integer id);
	void agregarDias(WrapperDia wd);
}
