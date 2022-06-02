                         var xArray = ["Miembrxs", "Usuarixs", "Becarixs", "Admin"];
                             const count = {}                        
                            for(const participant of members){
                                if(count[participant.position]){
                                    count[participant.position] += 1

                                }else{
                                    count[participant.position] = 1
                                }
                            }
 

                            
                            
                        
                            var yArray = [1, 49, 44, 24];

                            var data = [{
                            x:xArray,
                            y:yArray,
                            type:"bar"
                            }];

                            var layout = {title:`Participantes registrados`};

                            Plotly.newPlot("myPlot", data, layout);