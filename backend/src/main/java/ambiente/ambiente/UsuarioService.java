package ambiente.ambiente;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {
	void nuevoUsuario(Usuario ususario);
	void editarUsuario(Usuario ususario);
	void borrarUsuario(Integer id);
	Optional<Usuario> getUsuario(Integer id);
	List<Usuario> getUsuarios();
	Usuario isRegsitered(Usuario usuario);
	void usuarioAddMagnitud(Usuario usuario, Magnitud magnitud);
	List<Magnitud>getMagnitudUsr(Integer id);
	void usuarioAddPerfil(Usuario usuario, Perfil perfil);
	List<Perfil>getPerfilesUsr(Integer id);
	List<Calendario>getCalendariosUsr(Integer id);
	List<Cultivo>getCultivosUsr(Integer id);
	void usuarioAddCultivo(Usuario user, Cultivo cultivo);
	void usuarioAddCalendario(Usuario user, Calendario calendario);

}
