rentHomeApp.factory('HomeService', function($resource)
        {
            return {
                      homes: $resource('/homes/:id', {id: '@_id'},
                            { update: { method: 'PUT' }}),
                      rents: $resource('/homes/:id', {id: '@_id'},
                            { update: { method: 'PUT' }})
                    };
        });
