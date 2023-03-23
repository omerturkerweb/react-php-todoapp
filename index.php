    <?php
    header('Access-Control-Allow-Origin: *'); 
    header('Content-Type: application/json');
    $dbName = 'todosdb';
    $dbUserName = 'root';
    $dbPassword = '';
    try{
        $db = new PDO("mysql:host=localhost;dbname={$dbName};charset=utf8",$dbUserName , $dbPassword);
        if($_SERVER['REQUEST_METHOD'] === 'GET'){
            $selectQuery = $db->query('select * from todos')->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($selectQuery);
        }
        else if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $action = $_POST['action'];
 
            switch($action){
                case 'add-todo':
                    $todo = $_POST['todo'];
                    $insertQuery = $db->prepare("insert into todos set todo = :todo, todo_done = :todo_done");
                    $insert = $insertQuery->execute(['todo' => $todo , 'todo_done' => 0]);
                    $selectQuery = $db->query('select * from todos')->fetchAll(PDO::FETCH_ASSOC);
                    echo json_encode($selectQuery);
                    break;

                case 'delete-todo':
                        $todo_id = $_POST['todo_id'];
                        $deleteQuery = $db->prepare('delete from todos where todo_id = :todo_id');
                        $delete = $deleteQuery->execute(['todo_id' => $todo_id]);
                        $selectQuery = $db->query('select * from todos')->fetchAll(PDO::FETCH_ASSOC);
                        echo json_encode($selectQuery);
                    break;

                case 'done-todo':
                        $todo_done = $_POST['done'];
                        $todo_id = $_POST['done_id'];
                        $updateQuery = $db->prepare('update todos set todo_done = :todo_done where todo_id = :todo_id');
                        $update = $updateQuery->execute(['todo_done' => $todo_done , 'todo_id' => $todo_id]);
                        $selectQuery = $db->query('select * from todos')->fetchAll(PDO::FETCH_ASSOC);
                        echo json_encode($selectQuery);
                    break;  
            }
        }
    }catch(PDOException $e) {
        $e->getMessage();
    }
       


