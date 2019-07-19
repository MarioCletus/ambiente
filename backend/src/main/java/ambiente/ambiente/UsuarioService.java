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
}
